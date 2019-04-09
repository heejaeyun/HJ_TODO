import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dimensions from "./Dimensions";

const Container = styled.View`
  width: ${Dimensions.width - 50};
  border-bottom-color: #bbb;
  border-bottom-width: 3;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${Dimensions.width / 2};
`;

const TouchableOpacity = styled.TouchableOpacity``;

const Text = styled.Text`
  font-weight: 600;
  font-size: 20px;
  margin: 18px 0;
  text-decoration: ${props => (props.isComplete ? "line-through" : null)};
  color: ${props => (props.isComplete ? "#bbb" : "black")};
`;

const Circle = styled.View`
  width: 30;
  height: 30;
  border-radius: 15;
  border-color: ${props => (props.isComplete ? "#7CFC00" : "red")};
  border-width: 3;
  margin-right: 20px;
`;

const IconContainer = styled.View`
  margin-vertical: 10;
  margin-horizontal: 10;
  flex-direction: row;
`;

const Icon = styled.Text``;

const View = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${Dimensions.width / 3};
`;

const Viewf = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${props =>
    props.isEditing ? Dimensions.width / 1.3 : Dimensions.width / 1.5};
`;

const TextInput = styled.TextInput`
  font-weight: 600;
  font-size: 20px;
  margin: 18px 0;
`;

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    completeTodo: PropTypes.func.isRequired,
    uncompleteTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func,
    isComplete: PropTypes.bool.isRequired
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { isComplete, id, deleteTodo, text } = this.props;
    return (
      <Container>
        <Column>
          <Viewf isEditing={isEditing}>
            <TouchableOpacity onPress={this._toggleBotton}>
              <Circle isComplete={isComplete} />
            </TouchableOpacity>
            {isEditing ? (
              <TextInput
                value={toDoValue}
                multiline={true}
                onChangeText={this.controllInput}
                returnKeyType={"done"}
                onBlur={this._offEditing}
              />
            ) : (
              <Text  key={id}isComplete={isComplete} isEditing={isEditing}>
                {text}
              </Text>
            )}
          </Viewf>
          {isEditing ? (
            <View>
              <TouchableOpacity onPressOut={this._offEditing}>
                <IconContainer>
                  <Icon>✅</Icon>
                </IconContainer>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPressOut={this._onEditing}>
                <IconContainer>
                  <Icon>✏️</Icon>
                </IconContainer>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                <IconContainer>
                  <Icon>❌</Icon>
                </IconContainer>
              </TouchableOpacity>
            </View>
          )}
        </Column>
      </Container>
    );
  }

  _toggleBotton = () => {
    const { isComplete, uncompleteTodo, completeTodo, id } = this.props;
    if (isComplete) {
      uncompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };

  _onEditing = () => {
    this.setState({
      isEditing: true
    });
  };
  _offEditing = () => {
    const { toDoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };

  controllInput = text => {
    this.setState({
      toDoValue: text
    });
  };
}

export default Todo;
