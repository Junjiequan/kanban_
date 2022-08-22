import { useAppDispatch } from '../../hooks/useRedux';
import Column from './Column';
import type { IBoard, IColumn } from '../../data/type';
import { useEffect, useState } from 'react';
import { setTab } from '../../reducer/boardTabSlice';
import { dragDropTasks, setBoardStatus } from '../../reducer/dataSlice';
import Button from '../../standard/Button';
import { openModal } from '../../reducer/modalSlice';
import { DragDropContext, resetServerContext } from '@hello-pangea/dnd';
import { reorderInSameColumn, reorderInDiffColumn } from '../../helper/util';
import useMediaQuery from '../../hooks/useMediaQuery';

resetServerContext();
interface BoardProps {
  hideSideNav: boolean;
  board?: any;
  allBoards: IBoard[];
  currentTab: string;
}

const Board = (props: BoardProps) => {
  const { hideSideNav, board, allBoards, currentTab } = props;
  const dispatch = useAppDispatch();
  const mobileQuery = useMediaQuery('mobile');
  const [draggableData, setDraggableData] = useState(board);
  const onHide = hideSideNav || mobileQuery ? 'Board__full' : '';
  const columnsCount: number = board?.columns ? board.columns.length : 0;

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    //unknown position
    if (!destination) return;

    //same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    //same column different position
    const sourceCol = draggableData!.columns!.find((i: any) => i.id == source.droppableId);
    const destinationCol = draggableData!.columns!.find((i: any) => i.id == destination.droppableId);
    const task = sourceCol?.tasks[source.index];
    const dataCol = draggableData.columns.reduce((acc: any, value: any) => {
      return { ...acc, [value.id]: value };
    }, {});

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderInSameColumn(sourceCol, source.index, destination.index);
      const newBoard = {
        ...draggableData,
        columns: Object.values({ ...dataCol, [newColumn.id]: newColumn }),
      };

      dispatch(dragDropTasks({ currentBoardId: board.id, newBoard: newBoard, newTask: task, newColId: newColumn.id }));
      setDraggableData(newBoard);
      return;
    }

    //different column
    const newStartEnd = reorderInDiffColumn(sourceCol, destinationCol, source.index, destination.index);

    const newBoard = {
      ...draggableData,
      columns: Object.values({
        ...dataCol,
        [newStartEnd.newStartCol.id]: newStartEnd.newStartCol,
        [newStartEnd.newEndCol.id]: newStartEnd.newEndCol,
      }),
    };

    dispatch(
      dragDropTasks({ currentBoardId: board.id, newBoard: newBoard, newTask: task, newColId: newStartEnd.newEndCol.id })
    );
    setDraggableData(newBoard);
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
        <p className='Board--noItem__txt'>This board is empty. Create a new column to get started.</p>
        <div className='Board--noItem__btn'>
          <Button
            small={mobileQuery}
            onClick={() => {
              dispatch(openModal({ ModalType: 'AddBoard' }));
            }}
          >
            &nbsp; + Create New Board &nbsp;
          </Button>
        </div>
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
