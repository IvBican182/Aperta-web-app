using Aperta_web_app.Contracts;
using Aperta_web_app.Data;
using Aperta_web_app.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Runtime.CompilerServices;

namespace Aperta_web_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IClubService _clubService;
        private readonly IClubsRepository _clubsRepository;
        private readonly AppDbContext _dbcontext;
        public StripeController(AppDbContext dbcontext, IClubService clubService, IClubsRepository clubsRepository) 
        {
            _clubService = clubService;
            _clubsRepository = clubsRepository;
            _dbcontext = dbcontext;
        }

        [HttpPost("create-express-account-link")]
        public async Task<IActionResult> CreateExpressAccountLink(int clubId)
        {
            try
            {


                var club = await _clubsRepository.GetAsync(clubId);
                if (club == null)
                {
                    return NotFound("Club not found.");
                }

                // Create Stripe account if not already created
                if (string.IsNullOrEmpty(club.StripeId))
                {
                    var options = new Stripe.AccountCreateOptions
                    {
                        Type = "express",
                        Country = "US",
                        Email = club.ContactEmail
                    };

                    var accountService = new Stripe.AccountService();
                    var account = await accountService.CreateAsync(options);

                    await _clubService.SetStripeAccountIdAsync(clubId, account.Id);
                }

                // Generate the onboarding link
                var accountLinkService = new Stripe.AccountLinkService();
                var accountLinkOptions = new Stripe.AccountLinkCreateOptions
                {
                    Account = club.StripeId,
                    RefreshUrl = "https://localhost:7147/onboarding/refresh",
                    ReturnUrl = "https://localhost:7147/onboarding/complete",
                    Type = "account_onboarding",
                };
                var accountLink = await accountLinkService.CreateAsync(accountLinkOptions);

                return Ok(new { Url = accountLink.Url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }



        [HttpPost("webhooks/stripe")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                Console.WriteLine("Webhook received");

                var stripeEvent = Stripe.EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    "whsec_d59a0972eae531d05d93ec376eb6a9c6520b4eba48c977af68b3a1632f8281ff"
                );

                Console.WriteLine($"Event type: {stripeEvent.Type}");

                if (stripeEvent.Type == "account.updated")
                {
                    var account = stripeEvent.Data.Object as Stripe.Account;

                    if (account == null)
                    {
                        Console.WriteLine("Account object is null.");
                        return BadRequest("Account object is null.");
                    }

                    // Log account details for debugging
                    Console.WriteLine($"Account ID: {account.Id}");
                    Console.WriteLine($"Charges Enabled: {account.ChargesEnabled}");
                    Console.WriteLine($"Details Submitted: {account.DetailsSubmitted}");

                    // Update club's Stripe status in the database
                    // Ensure the account meets your conditions for billing readiness
                    if (account.ChargesEnabled && account.DetailsSubmitted)
                    {
                        // Retrieve the club using the StripeId
                        var club = await _dbcontext.Clubs.FirstOrDefaultAsync(c => c.StripeId == account.Id);

                        if (club != null)
                        {
                            // Update the BillingInfo flag
                            club.BillingInfo = true;
                            await _dbcontext.SaveChangesAsync();

                            Console.WriteLine($"Club {club.Id} updated with BillingInfo = true.");
                        }
                        else
                        {
                            Console.WriteLine($"Club with StripeId {account.Id} not found.");
                            return NotFound($"Club with StripeId {account.Id} not found.");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Account {account.Id} does not meet the required conditions.");
                    }
                }

                return Ok();
            }
            catch (StripeException e)
            {
                Console.WriteLine($"Stripe exception: {e.Message}");
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Server error: {ex.Message}");
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }


    }
}
