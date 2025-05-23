import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef} from "react";
import { useSupabase } from "../context/Supabase";

const ListingPage = () => {
  const supabase = useSupabase();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [rdate, setRdate] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [bookPdf, setBookPdf] = useState("");
  const [desc, setDesc] = useState("");
  const [trope, setTrope] = useState("");

  const coverPicRef = useRef(null);
  const bookPdfRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.handleCreateNewListing(
      name,
      author,
      rdate,
      coverPic,
      desc,
      bookPdf,
      trope
    );
  
    // Reset form fields
    setName("");
    setAuthor("");
    setRdate("");
    setDesc("");
    setTrope("");

    // Reset file inputs
    if (coverPicRef.current) coverPicRef.current.value = null;
    if (bookPdfRef.current) bookPdfRef.current.value = null;
  };

  return (
    <div className="container mt-4">
      {/* <h2>List your Book</h2><br></br> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicBname">
          <Form.Label>Enter Book Name: </Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAname">
          <Form.Label>Enter Author's Name: </Form.Label>
          <Form.Control
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Author's Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAname">
          <Form.Label>Genre/Trope: </Form.Label>
          <Form.Control
            onChange={(e) => setTrope(e.target.value)}
            value={trope}
            type="text"
            placeholder="Enter Genre of the Book"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAname">
          <Form.Label>Book Description: </Form.Label>
          <Form.Control
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            type="text"
            placeholder="About the Book"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Enter Release Date: </Form.Label>
          <Form.Control
            onChange={(e) => setRdate(e.target.value)}
            value={rdate}
            type="date"
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label>Upload Cover Page of the Book: </Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
            ref={coverPicRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label>Upload PDF of the Book: </Form.Label>
          <Form.Control
            onChange={(e) => setBookPdf(e.target.files[0])}
            type="file"
            ref={bookPdfRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Listing
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
