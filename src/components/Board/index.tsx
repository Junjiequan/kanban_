import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Column from './Column';
import type { IColumn } from '../../data/type';
import { useEffect } from 'react';
import { setTab } from '../../reducer/boardTabSlice';
import { setBoardStatus } from '../../reducer/dataSlice';
import Button from '../../standard/Button';
import { openModal } from '../../reducer/modalSlice';

interface BoardProps {
  hideSideNav: boolean;
}

const Board = (props: BoardProps) => {
  const dispatch = useAppDispatch();
  const { hideSideNav } = props;
  const data = useAppSelector((state) => state.data.data);
  const currentTab = useAppSelector((state) => state.boardTab);
  const currentBoard = data.find((item) => item.name === currentTab);
  const onHide = hideSideNav ? 'Board__full' : '';
  const columnsCount: number = currentBoard?.columns ? currentBoard.columns.length : 0;

  useEffect(() => {
    if (!currentBoard && data.length !== 0) {
      dispatch(setTab(data[0]?.name));
      dispatch(setBoardStatus(data[0].name));
    }
    if (data.length === 0) {
      dispatch(setTab('No Board Found'));
    }
  }, [data]);

  if (!currentBoard)
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
      {currentBoard.columns?.map((columnData: IColumn, index: number) => (
        <Column key={index} columnData={columnData} ballColor={index} />
      ))}

      {columnsCount < 6 && <Column ballColor={3} columnData={undefined} />}
    </div>
  );
};

export default Board;
