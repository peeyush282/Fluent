import axios from "axios";
import {
  Grid,
  Icon,
  Dropdown,
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
  const [open, setOpen] = useState(false);
  const [favouriteList, setFavouriteList] = useState([]);
  const [favList, setList] = useState([]);
  const [fildata1, setFileredData1] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const initialdataFiltered = {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  };

  const [datafiltered, setDataFiltered] = useState(initialdataFiltered);
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    let clonedata = data1;
    if (datafiltered.name != "") {
      clonedata = clonedata.filter((fdata) =>
        fdata.name.includes(datafiltered.name)
      );
      if (clonedata.length === 0) {
        setOpenModal(true);
      }
    }

    if (datafiltered.status != "") {
      clonedata = clonedata.filter(
        (fdata) => fdata.status === datafiltered.status
      );
      if (clonedata.length === 0) {
        setOpenModal(true);
      }
    }

    if (datafiltered.species != "") {
      clonedata = clonedata.filter(
        (fdata) => fdata.species === datafiltered.species
      );
      if (clonedata.length === 0) {
        setOpenModal(true);
      }
    }

    if (datafiltered.type != "") {
      clonedata = clonedata.filter((fdata) => fdata.type === datafiltered.type);
      if (clonedata.length === 0) {
        setOpenModal(true);
      }
    }

    if (datafiltered.gender != "") {
      clonedata = clonedata.filter(
        (fdata) => fdata.gender === datafiltered.gender
      );
      if (clonedata.length === 0) {
        setOpenModal(true);
      }
    }
    setfilteredData(clonedata);
  }, [datafiltered]);

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
    setDataFiltered({ ...datafiltered, name: value });
  };

  const filterByGender = (e, { value }) => {
    setDataFiltered({ ...datafiltered, gender: value });
  };

  const filterByStatus = (e, { value }) => {
    setDataFiltered({ ...datafiltered, status: value });
  };
  const filterBySpecies = (e, { value }) => {
    setDataFiltered({ ...datafiltered, species: value });
  };
  const filterByType = (e, { value }) => {
    setDataFiltered({ ...datafiltered, type: value });
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

  console.log("filteredData", filteredData);

  return (
    <div>
      {openModal && (
        <Modal
          closeIcon
          open={openModal}
          onClose={() => setOpenModal(false)}
          onOpen={() => setOpenModal(true)}
        >
          <Header icon="info circle" content="Messages" />
          <Modal.Content>
            <p>NO results found!</p>
          </Modal.Content>
        </Modal>
      )}
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
        {filteredData.length === 0 ? (
          <Grid>
            <Grid.Row>
              {data1 &&
                data1.map((character, index) => {
                  if (favList !== []) {
                    return favList.map((item) => {
                      if (character.id == item.fid) {
                        return (
                          <Grid.Column
                            // width={3}
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
                    <Grid.Column key={index} className={styles.col}>
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
            {filteredData.map((character, index) => {
              return (
                <Grid.Column key={index} className={styles.col}>
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
