import React from 'react';

import style from './scss/App.module.scss';

const items = [
  {
    index: 6,
    dropChance: 0.0005,
    back: 'https://ak74.ru/wa-data/public/shop/products/97/24/22497/images/10905/10905.970.jpg',
  },
  {
    index: 5,
    dropChance: 0.0021,
    back: 'https://www.air-gun.ru/images/average/68180/2014073154658395.jpg',
  },
  {
    index: 4,
    dropChance: 0.0098,
    back: 'https://thumbs.dreamstime.com/b/four-bullets-two-caliber-shot-black-white-152083648.jpg',
  },
  {
    index: 3,
    dropChance: 0.0421,
    back: 'https://thumbs.dreamstime.com/b/%D0%B1%D0%B5%D0%BB%D0%B8%D0%B7%D0%BD%D0%B0-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BF%D1%83%D0%BB%D1%8C-%D0%BF%D1%80%D0%B5%D0%B4%D0%BF%D0%BE%D1%81%D1%8B%D0%BB%D0%BA%D0%B8-d-113435497.jpg',
  },
  { index: 2, dropChance: 0.1808, back: 'https://30-06.ru/images/pulsar/trail-lrf-2-xp50_6.png' },
  {
    index: 1,
    dropChance: 0.7647,
    back: 'https://www.downloadclipart.net/large/bullet-png-transparent-image.png',
  },
];

function App() {
  const slider = React.useRef(null);
  const [arr, setArr] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [prize, setPrize] = React.useState([]);

  function Perebor() {
    const length = 43;
    const numbers = [...Array(length)];
    for (let i = 0; i < numbers.length; i += 1) {
      const chance = Math.random();
      let current = 0;
      for (const item of items) {
        if (current <= chance && chance < current + item.dropChance) {
          numbers[i] = item;
        }
        current += item.dropChance;
      }
    }
    const data = numbers.map((item, index) => ({ ...item, id: index + 1 }));
    setArr(data);
  }

  const newPerebor = React.useCallback(() => {
    const newArr = arr.slice(40);
    const length = 40;
    const numbers = [...Array(length)];
    for (let i = 0; i < numbers.length; i += 1) {
      const chance = Math.random();
      let current = 0;
      for (const item of items) {
        if (current <= chance && chance < current + item.dropChance) {
          numbers[i] = item;
        }
        current += item.dropChance;
      }
    }
    newArr.forEach((e) => {
      delete e.id;
    });
    const mass = newArr.concat(numbers);
    const data = mass.map((item, index) => ({ ...item, id: index + 1 }));
    setArr(data);
  }, [arr]);

  React.useEffect(() => {
    if (flag) {
      slider.current.childNodes.forEach((e) => {
        e.style = `transform: translateX(0px); transition: 0s`;
      });
      newPerebor();
      setFlag(false);
      setActive(true);
    }
  }, [flag, newPerebor]);

  // React.useEffect(() => {
  //   tg.ready();
  // }, []);

  React.useEffect(() => {
    Perebor();
  }, []);

  let position = 0;

  const go = () => {
    if (flag === false) {
      setActive(false);
      setPrize(arr[41]);
      position -= 5200;
      slider.current.childNodes.forEach((e) => {
        e.style = `transform: translateX(${position}px)`;
      });
      ontransitionend = () => {
        setFlag(true);
      };
    }
  };
  console.log(prize);

  return (
    <div className={style.App}>
      <div className={style.Container}>
        <div className={style.Content}>
          <div className={style.Ruletka} ref={slider}>
            {arr.map(({ id, back }) => (
              <div key={id} className={style.Box}>
                <img src={back} alt="lorem" width="100px" height="100px" />
              </div>
            ))}
          </div>
          <div className={style.Cursor}></div>
        </div>
      </div>
      {active ? (
        <button className={style.Button} onClick={go}>
          Крутить!
        </button>
      ) : (
        <button className={style.ButtonPassive}>Крутить!</button>
      )}
    </div>
  );
}

export default App;
