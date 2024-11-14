import { useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { fetchUsers } from "../Redux/userSlice";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"
import style from "./AdminHomepage.module.css";
import { useNavigate } from "react-router";

export default function AdminHomepage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //const users = useSelector((state: RootState) => state.users.users )
    
    /* function fetch() {
        dispatch(fetchUsers());
    } */

    /* useEffect(() => {
        fetch();
        console.log(users);
    }, []); */

    return(
        <>
        <p>textich</p>
        <Container className={style.userContainer}>
            <Row className={style.row}>

            <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">GROUPS</h5>
                            <p>add players and manage groups of players to your liking</p>
                            <button className="btn btn-primary" onClick={()=> navigate("/groups")}>SEE MORE</button>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">TRAINING</h5>
                            <p>Set training for your team</p>
                            <p className="card-text">see the details</p>
                            <a href="#" className="btn btn-primary">SEE MORE</a>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">PROFILE</h5>
                            <p>coach name</p>
                            <p>player email</p>
                            <p>group</p>
                            <p className="card-text">view and edit your profile details</p>
                            <button className="btn btn-primary" onClick={()=> navigate("/profile")}>SEE MORE</button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className={style.row}>   
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">NEWS FEED</h5>
                            <p className="card-text">Write news for your team group</p>
                            <a href="#" className="btn btn-primary">GO</a>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">TOTAL BUDGET</h5>
                            <p className="card-text">VIEW SUBSCRIPTION DETAILS</p>
                            <a href="#" className="btn btn-primary">VIEW DETAILS</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </>

        
    )
}