import * as S from './styled';
import { tabs } from '../../pages/PlayerPage/PlayerPage';
import { ReactComponent as PlaylistIconSvg } from '../../assets/playlistIcon.svg';
import { ReactComponent as ChatIconSvg } from '../../assets/chatIcon.svg';

const tabsArr = [
  { tabName: tabs.CHAT, Icon: ChatIconSvg, label: 'Chat' },
  { tabName: tabs.PLAYLIST, Icon: PlaylistIconSvg, label: 'Playlist' },
];

interface TabsSwitcherProps {
  onClick: any;
  activeTab: any;
}

export const TabsSwitcher = ({ onClick, activeTab }: TabsSwitcherProps) => {
  return (
    <S.ButtonsContainer>
      {tabsArr.map(({ tabName, Icon, label }) => {
        const isActive = activeTab === tabName;
        return (
          <S.SwitchButton isActive={isActive} onClick={() => onClick(tabName)}>
            <Icon width="20px" height="20px" />
            {label}
          </S.SwitchButton>
        );
      })}
    </S.ButtonsContainer>
  );
};
