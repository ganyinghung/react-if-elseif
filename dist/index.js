"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._if = void 0;
var CommandType;
(function (CommandType) {
    CommandType[CommandType["IF"] = 0] = "IF";
    CommandType[CommandType["THEN"] = 1] = "THEN";
    CommandType[CommandType["ELSE"] = 2] = "ELSE";
    CommandType[CommandType["ELSEIF"] = 3] = "ELSEIF";
})(CommandType || (CommandType = {}));
;
function _if(condition) {
    const commands = [];
    function _then(component) {
        commands.push({
            command: CommandType.THEN,
            argument: component
        });
        return {
            else: _else,
            elseif: _elseif,
            endif: _endif,
        };
    }
    function _else(component) {
        commands.push({
            command: CommandType.ELSE,
            argument: component
        });
        return {
            endif: _endif,
        };
    }
    function _elseif(condition) {
        commands.push({
            command: CommandType.ELSEIF,
            argument: condition
        });
        return {
            then: _then,
        };
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
                    if (i === commands.length - 1) {
                        // there is no ELSE in the statements
                        // but the IF condition is not satisified
                        // so we simply return null
                        return null;
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
exports._if = _if;
