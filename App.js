import React from "react";
import Presenter from "./Component/Presenter";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
import { AsyncStorage } from "react-native";

export default class App extends React.Component {
  state = {
    newtodo: "",
    loading: false,
    toDos: {}
  };

  componentDidMount() {
    this._loadTodo();
  }

  render() {
    const { newtodo, loading, toDos } = this.state;
    if (!loading) {
      return <AppLoading />;
    }
    return (
      <Presenter
        newtodo={newtodo}
        _controlltodo={this._controlltodo}
        addTodo={this.addTodo}
        toDos={toDos}
        deleteTodo={this.deleteTodo}
        uncompleteTodo={this.uncompleteTodo}
        completeTodo={this.completeTodo}
        updateTodo={this.updateTodo}
      />
    );
  }

  _controlltodo = text => {
    this.setState({
      newtodo: text
    });
  };

  _loadTodo = async () => {
    try {
      const toDos = await AsyncStorage.getItem("todos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loading: true,
        toDos: parsedToDos
      });
    } catch (err) {
      console.log(err);
    }
  };

  addTodo = () => {
    const { newtodo } = this.state;
    if (newtodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newtodoObject = {
          [ID]: {
            id: ID,
            isComplete: false,
            text: newtodo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newtodo: "",
          toDos: {
            ...prevState.toDos,
            ...newtodoObject
          }
        };
        this._saveTodos(newState.toDos);
        return { ...newState };
      });
    }
  };

  deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isComplete: false
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isComplete: true
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  _saveTodos = newtodo => {
    const savetodo = AsyncStorage.setItem("todos", JSON.stringify(newtodo));
  };
}
