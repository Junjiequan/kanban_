import { useAppDispatch } from '../../hooks/useRedux';
import Column from './Column';
import type { IBoard, IColumn } from '../../data/type';
import { useEffect, useState } from 'react';
import { setTab } from '../../reducer/boardTabSlice';
import { setBoardStatus } from '../../reducer/dataSlice';
import Button from '../../standard/Button';
import { openModal } from '../../reducer/modalSlice';
import { DragDropContext, resetServerContext } from '@hello-pangea/dnd';
import { reorderColumnList } from './util/util';

resetServerContext();
interface BoardProps {
  hideSideNav: boolean;
  board?: any;
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

    //unknown position
    if (!destination) return;

    //same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    //same column different position
    const sourceCol = draggableData!.columns![source.droppableId];
    const destinationCol = draggableData!.columns![destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(sourceCol, source.index, destination.index);
      const newBoard = {
        ...draggableData,
        columns: Object.values({ ...draggableData.columns, [newColumn.id]: newColumn }),
      };

      setDraggableData(newBoard);

      return;
    }
    //different column
  };

  useEffect(() => {
    setDraggableData(board);

    if (!board && allBoards.length !== 0) {
      dispatch(setTab(allBoards[0].name));
      dispatch(setBoardStatus(allBoards[0].name));
    }
    if (allBoards.length === 0) {
      dispatch(setTab('No Board Found'));
    }
  }, [allBoards, board]);

  if (!draggableData)
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
        {draggableData?.columns?.map((columnData: IColumn, index: number) => (
          <Column key={columnData.id} columnData={columnData} ballColor={index} />
        ))}
      </DragDropContext>
      {columnsCount < 6 && <Column ballColor={3} columnData={undefined} />}
    </div>
  );
};

export default Board;
