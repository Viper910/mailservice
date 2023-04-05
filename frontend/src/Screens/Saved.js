import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/Sidenav";
import { inbox, inboxDeletion, sent, sentDeletion } from "../service";
import { AiFillDelete } from "react-icons/ai";

export default function Saved() {
  const userToken = localStorage.getItem("token");
  const userMailId = localStorage.getItem("userMailId");
  const username = localStorage.getItem("userName");
  const [inboxmail, setInboxmail] = useState([]);
  const [sentmail, setSentMail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    } else {
      inbox(userToken)
        .then((mails) => {
          const allmails = mails.data.inbox;
          const impmails = allmails.filter((ele) => ele.important === true);
          setInboxmail(impmails);
        })
        .catch((err) => {
          console.log(err);
        });
      sent(userToken)
        .then((mails) => {
          const allmails = mails.data.sent;
          const impmails = allmails.filter((ele) => ele.important === true);
          setSentMail(impmails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userToken, navigate]);

  const inboxdeleteMail = (id) => {
    inboxDeletion(id, userToken)
      .then((result) => {
        console.log(result.data);
        alert(result.data);
        navigate("/inbox");
      })
      .catch((err) => {
        alert("Message not found");
      });
  };

  const sentdeleteMail = (id) => {
    sentDeletion(id, userToken)
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
        <h2>Starred Inbox mail</h2>
        <table class="table table-light table-hover table-borderless table-responsive">
          {inboxmail.length !== 0 ? (
            inboxmail.map((mail, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td onClick={() => inboxdeleteMail(mail._id)}>
                      <AiFillDelete className="deletebtn" />
                    </td>
                    <td width="30em">{mail.from}</td>
                    <td>
                      <strong>{mail.subject}-</strong>
                      {mail.message}
                    </td>
                    <td className="text-end text-muted">
                      {/* {mail.createdAt.slice(0, 10)} */}
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div class="alert alert-info" role="alert">
              No Starred Inbox mail
            </div>
          )}
          <h2>Starred Sent mails</h2>
          {sentmail.length !== 0 ? (
            sentmail.map((mail, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td onClick={() => sentdeleteMail(mail._id)}>
                      <AiFillDelete className="deletebtn" />
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
              No starred Sent mail
            </div>
          )}
        </table>
      </div>
    </SideNav>
  );
}
