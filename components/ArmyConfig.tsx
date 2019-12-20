import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Container,
  FormControl,
  Fab,
  Tooltip,
} from '@material-ui/core';

interface IProps {
  numbersOfArmy?: string[];
  isDisableAdd?: boolean;
  isDisableDelete?: boolean;
  setConfig?(nameArmy: any): void;
  newArmy?(): void;
  deleteArmy?(): void;
}

interface IState {
  nameArmy: any;
}

@inject(
  ({
    battleStore: { numbersOfArmy, newArmy, setConfig, isDisableAdd, isDisableDelete, deleteArmy },
  }) => ({
    numbersOfArmy,
    setConfig,
    newArmy,
    isDisableAdd,
    isDisableDelete,
    deleteArmy,
  })
)
@observer
class ArmyConfig extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.armyDelete = this.armyDelete.bind(this);
    this.submitPage = this.submitPage.bind(this);
    this.addArmy = this.addArmy.bind(this);
  }

  state: IState = {
    nameArmy: {},
  };

  armyDelete() {
    const { deleteArmy } = this.props;
    const newState = Object.assign({}, this.state);
    const indexKeyCountry = Object.keys(newState.nameArmy).reverse()[0];

    delete newState.nameArmy[indexKeyCountry];
    this.setState({
      ...newState,
    });
    deleteArmy && deleteArmy();
  }

  onChangeInput({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      nameArmy: {
        ...this.state.nameArmy,
        [name]: {
          country: value,
        },
      },
    });
  }

  onChangeSelect(event: React.ChangeEvent<any>) {
    const value = event.target.value as string;
    const name = event.target.name;

    this.setState({
      nameArmy: {
        ...this.state.nameArmy,
        [name]: {
          ...this.state.nameArmy[name],
          strategy: value,
        },
      },
    });
  }

  addArmy() {
    const { newArmy, numbersOfArmy } = this.props;

    const countInput = numbersOfArmy!.length;

    this.setState({
      nameArmy: {
        ...this.state.nameArmy,
        [`input-${countInput}`]: {
          country: '',
          strategy: '',
        },
      },
    });

    newArmy!();
  }

  submitPage(event: React.FormEvent) {
    event.preventDefault();

    const { setConfig } = this.props;
    const { nameArmy } = this.state;

    setConfig!(nameArmy);

    Router.push('/battle');

    this.setState({ nameArmy: {} });
  }

  render() {
    const { numbersOfArmy, isDisableAdd, isDisableDelete } = this.props;
    return (
      <>
        <Container maxWidth="sm">
          <form onSubmit={this.submitPage}>
            <div className="next">
              <Tooltip title="Next page Battle" aria-label="next">
                <Fab type="submit" size="small" color="primary" aria-label="next">
                  <NavigateNextIcon />
                </Fab>
              </Tooltip>
            </div>
            {numbersOfArmy &&
              numbersOfArmy.map((_template, index) => (
                <div key={`configItem-${index}`} className="army__config-item">
                  <TextField
                    required
                    name={`input-${index}`}
                    onChange={this.onChangeInput}
                    label="Name army"
                    variant="outlined"
                  />
                  <FormControl required style={{ width: 200 }}>
                    <InputLabel id="demo-simple-select-label">Strategy</InputLabel>
                    <Select
                      name={`input-${index}`}
                      value={
                        (this.state.nameArmy[`input-${index}`] &&
                          this.state.nameArmy[`input-${index}`].strategy) ||
                        ''
                      }
                      onChange={this.onChangeSelect}
                    >
                      <MenuItem value={'random'}>Random</MenuItem>
                      <MenuItem value={'weakest'}>Weakest</MenuItem>
                      <MenuItem value={'strongest'}>Strongest</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ))}
          </form>

          <div className="army__config-nav">
            <Tooltip title="Add new army" aria-label="add">
              <Fab
                disabled={isDisableAdd}
                onClick={this.addArmy}
                size="small"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Delete one army" aria-label="delete">
              <span>
                <Fab
                  disabled={isDisableDelete}
                  onClick={this.armyDelete}
                  size="small"
                  color="secondary"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </Fab>
              </span>
            </Tooltip>
          </div>
        </Container>
        <style jsx>{`
          .army__config {
            display: flex;
            flex-direction: column;
            max-width: 500px;
          }
          .army__config-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 15px;
          }
          .army__config-form {
            min-width: 200px;
          }
          .army__config-nav {
            display: flex;
            justify-content: space-between;
          }
          .next {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
          }
        `}</style>
      </>
    );
  }
}

export default ArmyConfig;
