import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/Sidenav";
import { AiFillDelete, AiFillStar} from "react-icons/ai";
import { sent, sentDeletion, sentstarredMessage } from "../service";

export default function Sent() {
  const userToken = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");
  const userMailId = localStorage.getItem("userMailId");
  const username = localStorage.getItem("userName");
  const [sentmail, setSentMail] = useState([]);
  const navigate = useNavigate();
  console.log(sentmail);
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    } else {
      sent(userToken)
        .then((mails) => {
          setSentMail(mails.data.sent);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userToken, navigate]);

  const deleteMail = (id) => {
    sentDeletion(id, userToken)
      .then((result) => {
        navigate("/sent");
      })
      .catch((err) => {
        alert("Message not found");
      });
  };

  const staredMail = (id) => {
    sentstarredMessage(id, userToken)
      .then((result) => {
        navigate("/sent");
      })
      .catch((err) => {
        alert("Message not found");
      });
  };

  return (
    <SideNav email={userMailId} username={username}>
      <div
        className="container-fluid align-self-stretch"
        style={{ backgroundColor: "aliceblue", borderRadius: "25px" }}
      >
        <table class="table table-light table-hover table-borderless table-responsive">
          {sentmail.length !== 0 ? (
            sentmail.map((mail, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td onClick={() => deleteMail(mail._id)}>
                      <AiFillDelete className="deletebtn" />
                    </td>
                    <td onClick={() => staredMail(mail._id)}>
                      {mail.important ? (
                        <AiFillStar style={{ color: "gold" }} />
                      ) : (
                        <AiFillStar className="starbtn" />
                      )}
                    </td>
                    <th width="30em">{mail.to}</th>
                    <th className="text-end">{mail.subject}-</th>
                    <td>{mail.message}</td>
                    <td className="text-end text-muted">
                      {/* {mail.createdAt.slice(0, 10)} */}
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div class="alert alert-info" role="alert">
              Sent is empty
            </div>
          )}
        </table>
      </div>
    </SideNav>
  );
}
