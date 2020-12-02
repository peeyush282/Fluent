import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/custom.module.css";
import {
  Card,
  CardContent,
  Grid,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
  Modal,
  Header,
  Button,
} from "semantic-ui-react";

function CardComponent({
  image,
  header,
  meta,
  description,
  character,
  setFavouriteList,
  favouriteList,
  id,
}) {
  // const changeImage = (image) => {
  //   return <img src={image} onClick={showModal}></img>;
  // };

  const [favouriteIcon, setFavouriteIcon] = useState(id ? id : 0);

  const addFavourite = (char) => {
    if (favouriteIcon) {
      setFavouriteIcon(0);
    } else {
      setFavouriteIcon(char.id);
    }

    if (!favouriteIcon) {
      // setFavouriteList([...favouriteList, char]);
      axios
        .post("http://localhost:3000/api/favourite", { id: char.id })
        .then((res) => {
          console.log("response", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // const index = favouriteList.indexOf(char);
      // console.log(index);
      // let arr = [];
      // arr = favouriteList;
      const id = char.id;
      axios
        .delete(`http://localhost:3000/api/favourite/${id}`)
        .then((res) => {
          console.log("response", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Extra = (character, id) => {
    return (
      <a onClick={() => addFavourite(character)}>
        {favouriteIcon ? (
          <Icon name="bookmark" color="red" />
        ) : (
          <Icon name="bookmark outline" />
        )}
        Favourite
      </a>
    );
  };

  return (
    <div className={styles.card}>
      <Card
        image={image}
        header={header}
        meta={meta}
        description={description}
        extra={Extra(character, id)}

        // onClick={showModal}
      />
    </div>
  );
}

export default CardComponent;
