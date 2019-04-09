import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dimensions from "../Dimensions";
import Todo from "../Todo";

const Container = styled.View`
  background-color: darkorange;
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  margin-top: 60px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Card = styled.View`
  background-color: white;
  flex: 1;
  width: ${Dimensions.width - 25};
  border-radius: 20px;
  box-shadow: 0px -1px 5px #000;
`;

const TextInput = styled.TextInput`
  padding: 20px;
  border-bottom-width: 1;
  border-bottom-color: #bbb;
  font-size: 17px;
`;

const ScrollView = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    alignItems: "center"
  }
}))``;

class Presenter extends React.Component {
  render() {
    const {
      deleteTodo,
      uncompleteTodo,
      completeTodo,
      updateTodo,
      newtodo,
      _controlltodo,
      addTodo,
      toDos
    } = this.props;
    return (
      <Container>
        <Title>HJ_TO DO 😁</Title>
        <Card>
          <TextInput
            placeholder={"NEW TO DO"}
            value={newtodo}
            onChangeText={_controlltodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={addTodo}
          />
          <ScrollView>
            {Object.values(toDos).map(to => (
              <Todo
                key={to.id}
                {...to}
                deleteTodo={deleteTodo}
                uncompleteTodo={uncompleteTodo}
                completeTodo={completeTodo}
                updateTodo={updateTodo}
              />
            ))}
          </ScrollView>
        </Card>
      </Container>
    );
  }
}

Presenter.propTypes = {
  newtodo: PropTypes.string,
  _controlltodo: PropTypes.func,
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  uncompleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func
};

export default Presenter;
