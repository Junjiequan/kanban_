import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Column from './Column';
import type { IBoard, IColumn } from '../../data/type';
import { useEffect, useState } from 'react';
import { setTab } from '../../reducer/boardTabSlice';
import { setBoardStatus } from '../../reducer/dataSlice';
import Button from '../../standard/Button';
import { openModal } from '../../reducer/modalSlice';
import { DragDropContext } from 'react-beautiful-dnd';

interface BoardProps {
  hideSideNav: boolean;
  board?: IBoard;
  allBoards: IBoard[];
}

const Board = (props: BoardProps) => {
  const { hideSideNav, board, allBoards } = props;
  const dispatch = useAppDispatch();
  const [draggableData, setDraggableData] = useState(board);

  const onHide = hideSideNav ? 'Board__full' : '';
  const columnsCount: number = board?.columns ? board.columns.length : 0;

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
  };

  useEffect(() => {
    if (!board && allBoards.length !== 0) {
      dispatch(setTab(allBoards[0].name));
      dispatch(setBoardStatus(allBoards[0].name));
    }
    if (allBoards.length === 0) {
      dispatch(setTab('No Board Found'));
    }
  }, [board]);

  if (!board)
    return (
      <div className={`Board ${onHide} Board--noItem`}>
        <Button
          onClick={() => {
            dispatch(openModal({ ModalType: 'AddBoard' }));
          }}
        >
          + Create New Board
        </Button>
      </div>
    );

  return (
    <div className={`Board ${onHide}`}>
      <DragDropContext onDragEnd={onDragEnd}>
        {board.columns?.map((columnData: IColumn, index: number) => (
          <Column key={index} columnData={columnData} ballColor={index} />
        ))}
      </DragDropContext>
      {columnsCount < 6 && <Column ballColor={3} columnData={undefined} />}
    </div>
  );
};

export default Board;
