import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "monday-ui-react-core";

import {
  toggleTodoIsCompleted,
  toggleTodoIsDeleted,
} from "../../../../redux/todos/actions";
import useIsHovered from "../../../../hooks/use-is-hovered";
import TodoTooltip from "../Todo-tooltip";
import TodoToggleIsDeletedIconButton from "../Todo-toggle-Is-deleted-icon-button";
import styles from "./todo-list-item.module.css";

const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const { id, value, isCompleted, isDeleted } = todo;

  const [isTodoItemHovered, hoverEventHandlers] = useIsHovered();

  const todoValueRef = useRef(null);

  const onToggleTodoIsCompleted = () => {
    dispatch(toggleTodoIsCompleted({ id, isCompleted: !isCompleted }));
  };

  const onToggleTodoIsDeleted = () => {
    dispatch(toggleTodoIsDeleted({ id, isDeleted: !isDeleted }));
  };

  useEffect(() => {
    isCompleted
      ? (todoValueRef.current.style.textDecoration = "line-through")
      : (todoValueRef.current.style.textDecoration = "");
  }, [isCompleted]);

  return (
    <>
      <TodoTooltip isVisible={isTodoItemHovered} todo={todo} />
      <li className={styles.item}>
        <Checkbox
          disabled={isDeleted}
          checked={isCompleted}
          onChange={onToggleTodoIsCompleted}
        />
        <span ref={todoValueRef} className={styles.value} {...hoverEventHandlers}>
          {value}
        </span>
        <TodoToggleIsDeletedIconButton
          isDeleted={isDeleted}
          onToggle={onToggleTodoIsDeleted}
        />
      </li>
    </>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object,
};

export default TodoListItem;
