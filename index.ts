import React from "react";

enum CommandType {
  IF,
  THEN,
  ELSE,
  ELSEIF,
};

type CommandEntry = {
  command: CommandType,
  argument: boolean | React.ReactNode | null
};

export function _if(condition: boolean) {
  const commands: CommandEntry[] = [];

  function _then(component: React.ReactNode) {
    commands.push({
      command: CommandType.THEN,
      argument: component
    });

    return {
      else: _else,
      elseif: _elseif,
    };
  }
  
  function _else(component: React.ReactNode) {
    commands.push({
      command: CommandType.ELSE,
      argument: component
    });

    return {
      endif: _endif,
    }
  }

  function _elseif(condition: boolean) {
    commands.push({
      command: CommandType.ELSEIF,
      argument: condition
    });

    return {
      then: _then,
    }
  }
  
  function _endif() {
    let last_condition;
    for (var i = 0; i < commands.length; i++) {
      switch (commands[i].command) {
        case CommandType.IF:
        case CommandType.ELSEIF:
          last_condition = commands[i].argument;
          break;
        case CommandType.THEN:
          if (last_condition === true) {
            return commands[i].argument;
          }
          break;
        case CommandType.ELSE:
          if (last_condition === false) {
            return commands[i].argument;
          }
          break;
        default:
          throw 'invalid syntax';
      }
    }
  }
  
  commands.push({
    command: CommandType.IF,
    argument: condition
  });

  return {
    then: _then,
  };

}