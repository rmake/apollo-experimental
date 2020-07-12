import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ROOT_QUERY } from "./App";

const POST_PHOTO_MUTATION = gql`
  mutation postPhoto($input: PostPhotoInput!) {
    postPhoto(input: $input) {
      id
      name
      url
    }
  }
`;

const PostPhotos = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PORTRAIT");
  const [file, setFile] = useState<File | string>("");
  const history = useHistory();

  const postPhoto = async (
    mutation: ({ variables }: { variables: any }) => void
  ) => {
    await mutation({
      variables: {
        input: { name, description, category, file },
      },
    });
    history.replace("/");
  };

  const updatePhotos = (
    cache: any,
    { data: { postPhoto } }: { data?: any }
  ) => {
    const data = cache.readQuery({ query: ROOT_QUERY });
    data.allPhotos = [postPhoto, ...data.allPhotos];
    cache.writeQuery({ query: ROOT_QUERY, data });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <h1>Post a Photo</h1>
      <input
        type="text"
        style={{ margin: "10px" }}
        placeholder="photo name..."
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <textarea
        style={{ margin: "10px" }}
        placeholder="photo description..."
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <select
        value={category}
        style={{ margin: "10px" }}
        placeholder="photo category..."
        onChange={({ target }) => setCategory(target.value)}
      >
        <option value="PORTRAIT">PORTRAIT</option>
        <option value="LANDSCAPE">LANDSCAPE</option>
        <option value="ACTION">ACTION</option>
        <option value="GRAPHIC">GRAPHIC</option>
      </select>
      <input
        type="file"
        style={{ margin: "10px" }}
        accept="image/jpeg"
        onChange={({ target }) =>
          setFile(target.files && target.files.length ? target.files[0] : "")
        }
      />

      <div style={{ margin: "10px" }}>
        <Mutation mutation={POST_PHOTO_MUTATION} update={updatePhotos}>
          {(mutation: () => void) => (
            <button onClick={() => postPhoto(mutation)}>Post Photo</button>
          )}
        </Mutation>
        <button onClick={() => history.goBack()}>Cancel</button>
      </div>
    </form>
  );
};

export default PostPhotos;
