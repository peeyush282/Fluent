import Head from "next/head";
import axios from "axios";
import {
  Grid,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
  Modal,
  Header,
  Button,
  GridColumn,
} from "semantic-ui-react";

import CardComponent from "../components/CardComponent";
import React, { useEffect, useState } from "react";
import styles from "../styles/custom.module.css";

const Index = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [filterdata, setFilterData] = useState([]);
  const [copyfilterdata, setCopyFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [favouriteList, setFavouriteList] = useState([]);
  const [favList, setList] = useState([]);
  const [fildata1, setFileredData1] = useState([]);

  const filterCharName = (character) => {
    const nameValues = character.name.split(" ");

    nameValues.forEach((name) => {
      if (name === "Morty" || name === "Rick") {
        data.push(character);
        setData(character);
      }
    });
    setData1(data);
  };

  const filterByName = (e, { value }) => {
    let copydata = data1;
    copydata = data1.filter((fdata) => fdata.name.includes(value));
    setFilterData(copydata);
    setCopyFilterData(copydata);
  };

  const filterByGender = (e, { value }) => {
    let copydata = filterdata;
    if (copydata.length > 0) {
      let results = copydata.filter((fdata) => fdata.gender === value);
      setFilterData(results);
      if (results.length > 0) {
        setCopyFilterData(results);
      } else {
        setFilterData(copyfilterdata);
      }
    }
  };

  const filterByStatus = (e, { value }) => {
    if (filterdata.length > 0) {
      let results = filterdata.filter((fdata) => fdata.status === value);
      setFilterData(results);

      if (results.length > 0) {
        setCopyFilterData(results);
      } else {
        setFilterData(copyfilterdata);
      }
    }
  };
  const filterBySpecies = (e, { value }) => {
    if (filterdata.length > 0) {
      let results = filterdata.filter((fdata) => fdata.species === value);
      setFilterData(results);

      if (results.length > 0) {
        setCopyFilterData(results);
      } else {
        setFilterData(copyfilterdata);
      }
    }
  };
  const filterByType = (e, { value }) => {
    if (filterdata.length > 0) {
      let results = filterdata.filter((fdata) => fdata.type === value);
      setFilterData(results);

      if (results.length > 0) {
        setCopyFilterData(results);
      } else {
        setFilterData(copyfilterdata);
      }
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        res.data.results.filter(filterCharName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/favourite/")
      .then((res) => {
        setList(res.data.data);
        filterFavItem(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterFavItem = (fdata) => {
    const arr = fdata;

    let arrdata = Object.assign([], data);

    arrdata.forEach((item, index) => {
      arr.forEach((fitem) => {
        if (item.id == fitem.fid) {
          arrdata.splice(index, 1);
        }
      });
    });

    setFileredData1(arrdata);
  };

  const changeImage = (image) => {
    return <img src={image} onClick={showModal}></img>;
  };

  const nameOptions = [
    { key: "rick", text: "Rick", value: "Rick" },
    { key: "morty", text: "Morty", value: "Morty" },
  ];

  const statusOptions = [
    { key: "alive", text: "Alive", value: "Alive" },
    { key: "dead", text: "Dead", value: "Dead" },
    { key: "unkown", text: "Unknown", value: "unknown" },
  ];
  const speciesOptions = [
    { key: "human", text: "Human", value: "Human" },
    { key: "alien", text: "Alien", value: "Alien" },
  ];
  const typeOptions = [
    { key: "parasite", text: "Parasite", value: "Parasite" },

    {
      key: "human with antennae",
      text: "Human with antennae",
      value: "Human with antennae",
    },
    {
      key: "human with ants in his eyes",
      text: "Human with ants in his eyes",
      value: "Human with ants in his eyes",
    },
  ];

  const genderOptions = [
    { key: "male", text: "Male", value: "Male" },
    { key: "female", text: "Female", value: "Female" },
  ];

  return (
    <div>
      {open && (
        <Modal
          closeIcon
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Header icon="info circle" content="Messages" />
          <Modal.Content>
            <p>future feature goes here!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setOpen(false)}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" onClick={() => setOpen(false)}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )}
      <div className={styles.dropdownContainer}>
        <span>Filter By : </span>
        <div>
          <Dropdown
            placeholder="Name"
            selection
            options={nameOptions}
            onChange={filterByName}
          />
        </div>
        <div>
          <Dropdown
            placeholder="Status"
            selection
            options={statusOptions}
            onChange={filterByStatus}
          />
        </div>
        <div>
          <Dropdown
            placeholder="Species"
            selection
            options={speciesOptions}
            onChange={filterBySpecies}
          />
        </div>
        <div></div>
        <Dropdown
          placeholder="Type"
          selection
          options={typeOptions}
          onChange={filterByType}
        />
        <div>
          <Dropdown
            placeholder="Gender"
            selection
            options={genderOptions}
            onChange={filterByGender}
          />
        </div>
      </div>
      <div className={styles.grid}>
        {filterdata.length == 0 ? (
          <Grid>
            <Grid.Row>
              {data1 &&
                data1.map((character, index) => {
                  if (favList !== []) {
                    return favList.map((item) => {
                      if (character.id == item.fid) {
                        return (
                          <Grid.Column
                            width={5}
                            key={index}
                            className={styles.col}
                          >
                            <CardComponent
                              image={changeImage(character.image)}
                              header={character.name}
                              meta={
                                character.gender +
                                ", " +
                                character.status +
                                ", " +
                                character.species
                              }
                              description={
                                "Location : " +
                                character.location.name +
                                ", " +
                                " Number of episode :" +
                                character.episode.length
                              }
                              // extra={extra}
                              character={character}
                              favouriteList={favouriteList}
                              setFavouriteList={setFavouriteList}
                              // onClick={showModal}
                              id={item.fid}
                            />
                          </Grid.Column>
                        );
                      }
                    });
                  }
                })}
              {fildata1 != [] &&
                fildata1.map((character, index) => {
                  return (
                    <Grid.Column width={5} key={index} className={styles.col}>
                      <CardComponent
                        image={changeImage(character.image)}
                        header={character.name}
                        meta={
                          character.gender +
                          ", " +
                          character.status +
                          ", " +
                          character.species
                        }
                        description={
                          "Location : " +
                          character.location.name +
                          ", " +
                          " Number of episode :" +
                          character.episode.length
                        }
                        // extra={extra}
                        character={character}
                        favouriteList={favouriteList}
                        setFavouriteList={setFavouriteList}
                        // onClick={showModal}
                        // id={item.fid}
                      />
                    </Grid.Column>
                  );
                })}
            </Grid.Row>
          </Grid>
        ) : (
          <Grid>
            {filterdata.map((character, index) => {
              return (
                <Grid.Column width={5} key={index} className={styles.col}>
                  <CardComponent
                    image={changeImage(character.image)}
                    header={character.name}
                    meta={
                      character.gender +
                      ", " +
                      character.status +
                      ", " +
                      character.species
                    }
                    description={
                      "Location : " +
                      character.location.name +
                      ", " +
                      " Number of episode :" +
                      character.episode.length
                    }
                    // extra={extra}
                    character={character}
                    favouriteList={favouriteList}
                    setFavouriteList={setFavouriteList}
                    // onClick={showModal}
                    // id={item.fid}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};

// Index.getInitialProps = () => {};

export default Index;
