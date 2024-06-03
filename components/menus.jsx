import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import TimeMenu from '@/components/menus/time-menu';
import MusicMenu from '@/components/menus/music-menu';
import BackgroundMenu from '@/components/menus/background-menu';
import { useGlobalColor } from '@/store/background';

const Menus = ({
  focusLength,
  shortBreakLength,
  longBreakLength,
  setFocusLength,
  setShortBreakLength,
  setLongBreakLength,
}) => {
  const [modal, setModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const globalColor = useGlobalColor((state) => state.globalColor);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);

      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  const handleSetModal = (label) => {
    if (label) {
      setModal(label);
      setTimeout(() => setIsModalVisible(true), 0); // Menunda perubahan isModalVisible
    } else {
      setIsModalVisible(false);
      setTimeout(() => setModal(null), 500); // Menunggu animasi selesai sebelum mengubah modal
    }
  };

  const menuItems = [
    {
      icon: 'material-symbols-light:alarm-rounded',
      label: 'Time',
      modal: (
        <TimeMenu
          focusLength={focusLength}
          shortBreakLength={shortBreakLength}
          longBreakLength={longBreakLength}
          setFocusLength={setFocusLength}
          setShortBreakLength={setShortBreakLength}
          setLongBreakLength={setLongBreakLength}
          setModal={handleSetModal}
        />
      ),
    },
    {
      icon: 'material-symbols-light:music-note-rounded',
      label: 'Music',
      modal: <MusicMenu setModal={handleSetModal} />,
    },
    {
      icon: 'material-symbols-light:image-rounded',
      label: 'Background',
      modal: <BackgroundMenu setModal={handleSetModal} />,
    },
  ];

  return (
    <div
      className={`fixed top-10 right-0 w-full justify-center md:w-fit md:justify-end md:right-10 grid grid-cols-3 md:gap-3 transition-opacity duration-500 ${
        isScrolling || !isTop ? 'opacity-0 animate-fadeOut' : 'opacity-100 animate-fadeIn'
      }`}
    >
      {menuItems.map((item, index) => (
        <div key={index} className="relative">
          <div
            onClick={() => handleSetModal(item.label)}
            className="flex flex-col items-center font-semibold gap-1 hover:text-slate-700 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-secondary">
              <Icon
                icon={item.icon}
                className="text-2xl"
                style={{ color: `#${globalColor}` }}
              />
            </div>
            <p>{item.label}</p>
          </div>
          {modal === item.label && (
            <div className={`absolute top-0 right-0 z-50 transition-opacity duration-500 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}>
              {item.modal}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menus;
