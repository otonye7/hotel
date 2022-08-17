import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import axios from "axios";
import { SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        getAccountBalance()
    }, [])

    const payOutSetting = async () => {
        let response = await axios.post(`http://localhost:7000/api/payout-setting`, {}, {
             headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
    }

    const handlePayOutSetting = async () => {
        setLoading(true)
        try {
           const response =  await payOutSetting();
           window.location.href = response.data.url
           setLoading(false)
        }  catch (err) {
            console.log(err);
            setLoading(false);
            alert("Unable to access setting")
        }
     }
 

    const getAccountBalance = async () => {
        let response = await axios.post(`http://localhost:7000/api/get-account-balance`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        setBalance(response.data)
    }

    const currencyFormatter = (data) => {
        return ( data.amount / 100 ).toLocaleString(data.currency, {
            style: "currency",
            currency: data.currency
        })
    }
 
    return (
        <div className="d-flex justify-content-around">
             <Card>
                <Meta 
                avatar={<Avatar>{user.user.name[0]}</Avatar>}
                title={user.user.name}
                description={`Joined ${moment(user.user.createdAt).fromNow()}`} 
                />
            </Card>
            {user && user.user && user.user.stripe_seller && user.user.stripe_seller.charges_enabled &&  <>
               <Ribbon text="Available" color="grey">
                  <Card className="bg-light pt-1">
                    {balance && balance.pending && balance.pending.map((ba, i) => {
                        return (
                            <span key={i}>
                                {currencyFormatter(ba)}
                            </span>
                        )
                    })}
                  </Card>
               </Ribbon>
               <Ribbon text="payout" color="silver">
                <Card className="bg-light pointer" onClick={handlePayOutSetting}>
                    <SettingOutlined className="h5 pt-2" />
                </Card>
               </Ribbon>
            </>}  
        </div>
    )
}

export default ConnectNav;