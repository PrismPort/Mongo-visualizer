"use client"

import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExampleDoughnut = () => {
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 1000],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <>
      <Doughnut data={data} />
    </>
  );
};
const OtherExampleDoughnut = () => {
  const data = {
    datasets: [{
      data: [{ id: 'Sales', nested: { value: 1500 } }, { id: 'Purchases', nested: { value: 500 } }]
    }]
  };
  const options = {
    parsing: {
      key: 'nested.value'
    }
  };
  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};
const ActualDoughnut = () => {
  const raw_response = `{"schema":[{"count":200,"type":"ObjectId","name":"_id","probability":1,"types":{"ObjectId":["6575f18c908be5d5762f197b","6575f18c908be5d5762f197c","6575f18c908be5d5762f197d","6575f18c908be5d5762f197e","6575f18c908be5d5762f197f","6575f18c908be5d5762f1980","6575f18c908be5d5762f1981","6575f18c908be5d5762f1982","6575f18c908be5d5762f1983","6575f18c908be5d5762f1984","6575f18c908be5d5762f1985","6575f18c908be5d5762f1986","6575f18c908be5d5762f1987","6575f18c908be5d5762f1988","6575f18c908be5d5762f1989","6575f18c908be5d5762f198a","6575f18c908be5d5762f198b","6575f18c908be5d5762f198c","6575f18c908be5d5762f198d","6575f18c908be5d5762f198e","6575f18c908be5d5762f198f","6575f18c908be5d5762f1990","6575f18c908be5d5762f1991","6575f18c908be5d5762f1992","6575f18c908be5d5762f1993","6575f18c908be5d5762f1994","6575f18c908be5d5762f1995","6575f18c908be5d5762f1996","6575f18c908be5d5762f1997","6575f18c908be5d5762f1998","6575f18c908be5d5762f1999","6575f18c908be5d5762f199a","6575f18c908be5d5762f199b","6575f18c908be5d5762f199c","6575f18c908be5d5762f199d","6575f18c908be5d5762f199e","6575f18c908be5d5762f199f","6575f18c908be5d5762f19a0","6575f18c908be5d5762f19a1","6575f18c908be5d5762f19a2","6575f18c908be5d5762f19a3","6575f18c908be5d5762f19a4","6575f18c908be5d5762f19a5","6575f18c908be5d5762f19a6","6575f18c908be5d5762f19a7","6575f18c908be5d5762f19a8","6575f18c908be5d5762f19a9","6575f18c908be5d5762f19aa","6575f18c908be5d5762f19ab","6575f18c908be5d5762f19ac","6575f18c908be5d5762f19ad","6575f18c908be5d5762f19ae","6575f18c908be5d5762f19af","6575f18c908be5d5762f19b0","6575f18c908be5d5762f19b1","6575f18c908be5d5762f19b2","6575f18c908be5d5762f19b3","6575f18c908be5d5762f19b4","6575f18c908be5d5762f19b5","6575f18c908be5d5762f19b6","6575f18c908be5d5762f19b7","6575f18c908be5d5762f19b8","6575f18c908be5d5762f19b9","6575f18c908be5d5762f19ba","6575f18c908be5d5762f19bb","6575f18c908be5d5762f19bc","6575f18c908be5d5762f19bd","6575f18c908be5d5762f19be","6575f18c908be5d5762f19bf","6575f18c908be5d5762f19c0","6575f18c908be5d5762f19c1","6575f18c908be5d5762f19c2","6575f18c908be5d5762f19c3","6575f18c908be5d5762f19c4","6575f18c908be5d5762f19c5","6575f18c908be5d5762f19c6","6575f18c908be5d5762f19c7","6575f18c908be5d5762f19c8","6575f18c908be5d5762f19c9","6575f18c908be5d5762f19ca","6575f18c908be5d5762f19cb","6575f18c908be5d5762f19cc","6575f18c908be5d5762f19cd","6575f18c908be5d5762f19ce","6575f18c908be5d5762f19cf","6575f18c908be5d5762f19d0","6575f18c908be5d5762f19d1","6575f18c908be5d5762f19d2","6575f18c908be5d5762f19d3","6575f18c908be5d5762f19d4","6575f18c908be5d5762f19d5","6575f18c908be5d5762f19d6","6575f18c908be5d5762f19d7","6575f18c908be5d5762f19d8","6575f18c908be5d5762f19d9","6575f18c908be5d5762f19da","6575f18c908be5d5762f19db","6575f18c908be5d5762f19dc","6575f18c908be5d5762f19dd","6575f18c908be5d5762f19de","6575f18c908be5d5762f19df","6575f18c908be5d5762f19e0","6575f18c908be5d5762f19e1","6575f18c908be5d5762f19e2","6575f18c908be5d5762f19e3","6575f18c908be5d5762f19e4","6575f18c908be5d5762f19e5","6575f18c908be5d5762f19e6","6575f18c908be5d5762f19e7","6575f18c908be5d5762f19e8","6575f18c908be5d5762f19e9","6575f18c908be5d5762f19ea","6575f18c908be5d5762f19eb","6575f18c908be5d5762f19ec","6575f18c908be5d5762f19ed","6575f18c908be5d5762f19ee","6575f18c908be5d5762f19ef","6575f18c908be5d5762f19f0","6575f18c908be5d5762f19f1","6575f18c908be5d5762f19f2","6575f18c908be5d5762f19f3","6575f18c908be5d5762f19f4","6575f18c908be5d5762f19f5","6575f18c908be5d5762f19f6","6575f18c908be5d5762f19f7","6575f18c908be5d5762f19f8","6575f18c908be5d5762f19f9","6575f18c908be5d5762f19fa","6575f18c908be5d5762f19fb","6575f18c908be5d5762f19fc","6575f18c908be5d5762f19fd","6575f18c908be5d5762f19fe","6575f18c908be5d5762f19ff","6575f18c908be5d5762f1a00","6575f18c908be5d5762f1a01","6575f18c908be5d5762f1a02","6575f18c908be5d5762f1a03","6575f18c908be5d5762f1a04","6575f18c908be5d5762f1a05","6575f18c908be5d5762f1a06","6575f18c908be5d5762f1a07","6575f18c908be5d5762f1a08","6575f18c908be5d5762f1a09","6575f18c908be5d5762f1a0a","6575f18c908be5d5762f1a0b","6575f18c908be5d5762f1a0c","6575f18c908be5d5762f1a0d","6575f18c908be5d5762f1a0e","6575f18c908be5d5762f1a0f","6575f18c908be5d5762f1a10","6575f18c908be5d5762f1a11","6575f18c908be5d5762f1a12","6575f18c908be5d5762f1a13","6575f18c908be5d5762f1a14","6575f18c908be5d5762f1a15","6575f18c908be5d5762f1a16","6575f18c908be5d5762f1a17","6575f18c908be5d5762f1a18","6575f18c908be5d5762f1a19","6575f18c908be5d5762f1a1a","6575f18c908be5d5762f1a1b","6575f18c908be5d5762f1a1c","6575f18c908be5d5762f1a1d","6575f18c908be5d5762f1a1e","6575f18c908be5d5762f1a1f","6575f18c908be5d5762f1a20","6575f18c908be5d5762f1a21","6575f18c908be5d5762f1a22","6575f18c908be5d5762f1a23","6575f18c908be5d5762f1a24","6575f18c908be5d5762f1a25","6575f18c908be5d5762f1a26","6575f18c908be5d5762f1a27","6575f18c908be5d5762f1a28","6575f18c908be5d5762f1a29","6575f18c908be5d5762f1a2a","6575f18c908be5d5762f1a2b","6575f18c908be5d5762f1a2c","6575f18c908be5d5762f1a2d","6575f18c908be5d5762f1a2e","6575f18c908be5d5762f1a2f","6575f18c908be5d5762f1a30","6575f18c908be5d5762f1a31","6575f18c908be5d5762f1a32","6575f18c908be5d5762f1a33","6575f18c908be5d5762f1a34","6575f18c908be5d5762f1a35","6575f18c908be5d5762f1a36","6575f18c908be5d5762f1a37","6575f18c908be5d5762f1a38","6575f18c908be5d5762f1a39","6575f18c908be5d5762f1a3a","6575f18c908be5d5762f1a3b","6575f18c908be5d5762f1a3c","6575f18c908be5d5762f1a3d","6575f18c908be5d5762f1a3e","6575f18c908be5d5762f1a3f","6575f18c908be5d5762f1a40","6575f18c908be5d5762f1a41","6575f18c908be5d5762f1a42"]}},{"count":200,"type":"Document","name":"address","probability":1,"types":{}},{"count":200,"type":"Document","name":"card","probability":1,"types":{}},{"count":200,"type":"String","name":"email","probability":1,"types":{"String":["bokell3@nsw.gov.au","pgullan2@yandex.ru","hlethby9@printfriendly.com","mgrabbama@linkedin.com","bdayb@diigo.com","cdaytong@amazon.de","nsouthwell1@ow.ly","zstuehmeyeri@fastcompany.com","glambersenj@jugem.jp","vripingl@mysql.com","hhouldeno@pcworld.com","mramet5@slashdot.org","lgillfillan7@rambler.ru","cwayper4@wufoo.com","fmeiklamq@163.com","jlennardes@berkeley.edu","rdefontt@friendfeed.com","hdebrickv@discovery.com","dhatherleighx@yellowbook.com","ciggaldenz@cnn.com","cidiens14@engadget.com","bploughwright18@163.com","kbaumford19@wordpress.org","bcholdcroft1a@squarespace.com","hjaquiss1c@google.ru","jdusey1d@wiley.com","ccherm1e@latimes.com","sbreadmore1g@cyberchimps.com","gcarefull1h@yellowbook.com","celt1j@marriott.com","sportigall1u@reverbnation.com","akeaveney1w@thetimes.co.uk","gpither1x@army.mil","aduncombe1z@oaic.gov.au","vbrimilcombe26@reuters.com","baltamirano25@livejournal.com","twoolatt27@archive.org","rblaycock2c@opensource.org","aimmer2d@skype.com","jivanshintsev2f@blogs.com","ngraver2h@abc.net.au","jcastanyer2i@tmall.com","balleyn2k@joomla.org","mpeevor2j@amazon.co.jp","mgimblet2m@pen.io","mlegrice2l@umn.edu","kchatelain2p@patch.com","tpargiter2n@purevolume.com","mskirven2o@hp.com","ahambers2q@vinaora.com","eskeat2t@people.com.cn","sspincke2u@themeforest.net","rmilby2s@alibaba.com","rgumley2v@boston.com","pgowers2x@nifty.com","idomengue33@dropbox.com","alammas32@360.cn","jhunsworth35@infoseek.co.jp","ifigurski38@slate.com","asorrie39@stanford.edu","csigg3a@rambler.ru","npimlett37@hp.com","tlockie3c@ow.ly","tbowater3d@sphinn.com","bheaphy3g@macromedia.com","kseville3i@gnu.org","hellyatt3j@icq.com","twailes3k@moonfruit.com","cbeneze3l@usatoday.com","acrew3q@amazon.com","hhember3t@samsung.com","escurry3x@hibu.com","ctollerfield42@arizona.edu","sbickersteth3w@posterous.com","nwilkerson3z@adobe.com","jquenell45@fotki.com","ilamey40@comsenz.com","mheinle46@vinaora.com","dsouthcoat4a@vimeo.com","alecount4b@amazon.co.jp","colone4d@dell.com","chedaux4e@bloglovin.com","rburkwood4f@wikispaces.com","kmingotti4j@chron.com","pgommey4i@tumblr.com","csnowsill4k@admin.ch","polahy4o@nhs.uk","oseabrook4r@mysql.com","alyte51@hubpages.com","kslixby50@ed.gov","imichelet56@apple.com","mhubbock4w@sina.com.cn","blenahan4y@diigo.com","ashropshire57@umich.edu","ptucker5b@home.pl","iyankeev5c@tinyurl.com","dodare5g@youku.com","wmalloch4z@sogou.com","cnewlove54@yale.edu","cmaith5i@eepurl.com"]}},{"count":200,"type":"String","name":"first_name","probability":1,"types":{"String":["Brigg","Brandise","Chane","Brennen","Libbie","Christean","Sanford","Zaccaria","Gustave","Vanny","Alanson","Carmelita","Cortney","Jennette","Reagan","Harli","Claus","Brendin","Dukey","Max","Codie","Blakeley","Richmound","Bob","Foster","Kimball","Bride","Harriette","Sarajane","Gustie","Blake","Mortimer","Audie","Robby","Benedetto","Salvidor","Alic","Andi","Bendix","Tallie","Donetta","Rhianna","Andromache","Joanna","Nichols","Barde","Mic","Matti","Mozelle","Karyl","Andreana","Elton","Stanislaus","Reiko","Rosene","Pennie","Pavla","Lionel","Meade","Isidore","Antone","Stavro","Hirsch","Keefer","Babita","Harli","Cosimo","Mady","Layney","Gabie","Mattie","Giana","Horton","Paola","Courtnay","Saudra","Tine","Jackie","Peirce","Elliot","Arnold","Chloe","Bartolomeo","Packston","Martin","Stinky","Johann","Alyss","Uta","Cori","Ashby","Kelli","Isa","Cathryn","Milicent","Lonna","Daisey","Waylen","Daren","Merry"]}},{"count":200,"type":"String","name":"gender","probability":1,"types":{"String":["Male","Female","Female","Male","Male","Male","Male","Male","Male","Male","Male","Female","Male","Female","Male","Female","Male","Female","Male","Male","Female","Female","Male","Female","Male","Female","Female","Male","Male","Female","Female","Female","Female","Male","Female","Female","Female","Female","Male","Male","Female","Female","Male","Male","Male","Female","Male","Male","Female","Male","Male","Male","Male","Male","Male","Male","Male","Female","Female","Female","Male","Male","Male","Female","Male","Female","Male","Male","Female","Male","Male","Female","Female","Female","Male","Male","Male","Female","Female","Male","Female","Female","Female","Male","Male","Male","Female","Female","Male","Female","Male","Female","Female","Male","Female","Female","Female","Male","Male","Male"]}},{"count":200,"type":"String","name":"last_name","probability":1,"types":{"String":["Okell","Ingerman","Wishkar","Grabbam","Mattiazzo","Waller","Docherty","De Luna","Langelaan","Riping","Houlden","Likly","Gillfillan","Meiklam","Burnes","Lennarde","Defont","Hatherleigh","Denman","Iggalden","Gallichiccio","Luberto","Labuschagne","Iannello","Ploughwright","Blanchet","Baumford","Lantaff","Cherm","Breadmore","Parr","Elt","Pugsley","Sterrick","Portigall","Welham","Fasson","Bushrod","Cultcheth","Brimilcombe","Altamirano","Grunwall","Blaycock","Ivanshintsev","Castanyer","Alleyn","Peevor","Chatelain","Hambers","Skeat","Spincke","Gumley","Gannicott","Althorp","Domengue","Stanlack","Hunsworth","Figurski","Sorrie","Sigg","Succamore","Guyet","Daymond","Heaphy","Ellyatt","Wailes","Beneze","Crew","Hember","Ferraro","Penke","Scurry","MacTrusty","Wilkerson","Heinle","Coppenhall","Southcoat","Newbigging","Burkwood","Gommey","Bromwich","Broadfoot","O'Lahy","Mabson","Mathews","Belch","Hemmingway","Hufton","Hartigan","Slany","Friatt","Michelet","Shropshire","Tucker","Yankeev","Borborough","Thorowgood","Malloch","Durling","Newlove"]}},{"count":200,"type":"Boolean","name":"married_status","probability":1,"types":{"Boolean":[true,false,true,true,false,false,false,true,false,false,true,false,false,true,false,false,false,true,true,false,false,true,true,false,true,true,false,false,true,false,false,false,true,true,true,false,true,false,false,false,false,false,true,false,true,false,false,true,false,false,false,false,true,false,false,false,false,true,false,false,true,false,true,true,false,false,true,false,false,false,true,false,false,true,true,true,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,true,true,true,true,false,true,false,true,false,false,true,false,true,false,false,true,true,false,false,true,true,false,false,false,false,false,true,true,true,true,false,true,false,true,true,true,false,false,true,false,true,true,false,true,true,true,false,true,true,false,false,false,true,true,false,true,false,true,true,false,false,false,false,false,true,false,false,false,false,false,true,true,false,false,false,true,false,false,true,true,false,true,true,false,false,false,false,true,false,true,false,false,true,false,false,false,false,false,true,true,false,true,true,true,true,true,false,true,true]}}]}`;
  const data = JSON.parse(raw_response);
  const married = data[7];
  const options = {
    parsing: {
      key: 'married_status',
    }
  };
  return (<Doughnut data={married} options={options} />);
}
const MongoPie = () => {
  return (
    <div className='flex'>
      <div className='w-1/4'>
        <ExampleDoughnut />
      </div>
      <div className='w-1/4'>
        <OtherExampleDoughnut />
      </div>
      <div className='w-1/4'>
        <ActualDoughnut />
      </div>
    </div>
  )
};



export { MongoPie };