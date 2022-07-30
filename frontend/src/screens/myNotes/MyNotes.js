import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteList = useSelector((state) => state.noteList);
  console.log("notelist", noteList);
  const { loading, notes, error } = noteList;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure..")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    successUpdate,
    successDelete,
    navigate,
    userInfo,
  ]);

  return (
    <MainScreen title={`Welcome Back  ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((n) => (
          <div className="card w-100" key={n._id}>
            <div className="card-body">
              <h5 className="card-title">{n.title}</h5>
              <p className="card-text">{n.content}</p>

              <div>
                <Button href={`/note/${n._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(n._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
