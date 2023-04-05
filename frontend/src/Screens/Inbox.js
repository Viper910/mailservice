import { useEffect, useState } from "react";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/Sidenav";
import { inbox, inboxDeletion, inboxstarredMessage } from "../service";

export default function Inbox() {
  const userToken = localStorage.getItem("token");
  const userMailId = localStorage.getItem("userMailId");
  const username = localStorage.getItem("userName");
  const [inboxmail, setInboxmail] = useState([]);
  const navigate = useNavigate();
  console.log(username);
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    } else {
      inbox(userToken)
        .then((mails) => {
          setInboxmail(mails.data.inbox);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userToken, navigate]);

  const deleteMail = (id) => {
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

  const staredMail = (id) => {
    inboxstarredMessage(id, userToken)
      .then((result) => {
        navigate("/inbox");
      })
      .catch((err) => {
        alert("Message not found");
      });
  };

  return (
    <SideNav username={username} email={userMailId}>
      <div
        className="container-fluid align-self-stretch"
        style={{ backgroundColor: "aliceblue", borderRadius: "25px" }}
      >
        <table class="table table-light table-hover table-borderless table-responsive">
          {inboxmail.length !== 0 ? (
            inboxmail.map((mail, id) => {
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
              Inbox is empty
            </div>
          )}
        </table>
      </div>
    </SideNav>
  );
}
