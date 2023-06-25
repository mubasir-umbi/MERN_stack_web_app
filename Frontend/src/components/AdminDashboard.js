import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage/Errormessage";
import { blockUserAction, listUsers } from "../actions/admin";
import axios from "axios";

function Dashboard() {

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersList = useSelector((state) => state.usersList);
  const { error, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  const blockUser = useSelector(state => state.blockUser)
  const { error:blockError, success:BlockSucess} = blockUser


  useEffect(() => {
    dispatch(listUsers());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, BlockSucess]);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }


  const blockHandler = (id) => {

    if(window.confirm("Are you sure?")){
      dispatch(blockUserAction(id))
    }
  }
  

  return (
    <div style={{ maxWidth: "70%", marginLeft: 'auto' , marginRight: 'auto'}}>
      <h1 style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>{`Welcome Back ${
        userInfo && userInfo.name
      }..`}</h1>
      <h1>Users</h1>
      <input
      style={{
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
        marginBottom: "30px",
      }} 
      type="text"
      placeholder="Search users"
      value={searchQuery}
      onChange={handleSearchChange}
    />
      <Link to="/createnote">
        {/* <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button> */}
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.filter((filteredNote) =>
            filteredNote.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .reverse().map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {/* <Button href={`/admin/block/:${user._id}`} variant="danger" >Block</Button> */}
                  <Button onClick={() => blockHandler(user._id)} variant={user.isBlock ? 'primary' : 'danger'} className="mx-2">
                    {user.isBlock ? 'Unblock' : 'Block'}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
