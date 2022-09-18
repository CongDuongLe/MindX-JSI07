import React, { useCallback, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  deleteField,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { async } from "@firebase/util";

const FIREBASE_COLLECTION = "playlists";

const FirebaseApp = () => {
  const [loading, setLoading] = useState(false);
  const [songId, setSongId] = useState("");
  const [songs, setSongs] = useState([]);

  const [singer, setSinger] = useState('');
  const [songOfSinger, setSongOfSinger] = useState('');

  // start collection from firebase

  const songRef = collection(db, FIREBASE_COLLECTION);
  console.log("first", songRef);

  const getSongs = async () => {
    setLoading(true);
    let allSongs = [];

    const songSnapshot = await getDocs(songRef);
    songSnapshot.docs.map((doc) => {
      return allSongs.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setLoading(false);
    setSongs(allSongs);
  };

  // cập nhật data realtime = onSnapshot

  const getDataRealtimes = async () => {
    const unsubscribe = onSnapshot(songRef, (snapshot) => {
      let allSongs = [];
      snapshot.docs.map((doc) => {
        return allSongs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setSongs(allSongs);
    });
    return unsubscribe;
  };

  useEffect(() => {
    // getQuotes();
    // getRealtimeSongs();
    // getSongs();
    getDataRealtimes();
  }, []);

  console.log("songs from firebase", songs);



  // gửi thông tin lên trên phía firebase 
  const handleCreate = async (e) => {
        e.preventDefault()
        await addDoc(songRef, { 
            singer : singer, // from keyboard type
            song : songOfSinger, // from keyboard type
            createAt : serverTimestamp() // from firebase
        }).then(() => {
            console.log('success')
        }).catch((error) => {
            console.log(error)
        })
        setSinger('')  
        setSongOfSinger('')
  }










  // get data from firebase

  //   const getQuotes = async () => {
  //     setLoading(true);
  //     let allSongs = [];
  //     const quoteSnapshot = await getDocs(quoteRef);
  //     //    quoteSnapshot.forEach((doc) => {
  //     //         console.log(doc.id, '=>', doc.data())
  //     //     })
  //     quoteSnapshot.docs.map((doc) => {
  //       return (
  //         allSongs.push({
  //             id: doc.id,
  //             ...doc.data()
  //         }),
  //         console.log('all Song', allSongs),
  //         setLoading(false)
  //         )
  //     });
  //     setSongs(allSongs);
  //     console.log('now we have :', songs)
  // }

  // get song from firestore

  // lấy dữ liệu realtime

  //   const getRealtimeSongs = () => {
  //     const unsubscribe = onSnapshot(quoteRef, (snapshot) => {
  //         let allSongs = [];
  //         snapshot.docs.map((doc) => {
  //             return (
  //                 allSongs.push({
  //                     id: doc.id,
  //                     ...doc.data()
  //                 })
  //             )
  //         })
  //         setSongs(allSongs);
  //     })
  //     return unsubscribe;
  // }

  // cập nhật document và hiển thị thời gian khi thêm document

  //   const handleSubmit = useCallback(
  //     async (e) => {
  //       e.preventDefault();
  //     //   addDoc(quoteRef, {
  //     //     title: quote,
  //     //     author: author,
  //     //   })
  //     //     .then(() => {
  //     //       console.log("added");
  //     //     })
  //     //     .catch((error) => {
  //     //       console.log(error);
  //     //     });

  //     await addDoc(quoteRef, {
  //         title: quote,
  //         author: author,
  //         createAt : serverTimestamp()
  //     }).then(() => {
  //         console.log("added");
  //     }).catch((error) => {
  //         console.log(error);
  //     })
  //       console.log("submit");
  //       setAuthor("");
  //       setQuote("");
  //     },
  //     [author, quote, quoteRef]
  //   );

  //   console.log('postId', quoteId)

  //   const handleDelete = async (e) => {
  //     e.preventDefault();
  //       await deleteDoc(doc(db, "quotes", quoteId))
  //         .then(() => {
  //           console.log("deleted", quoteId);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   };

  return (
    // <div className="flex flex-col px-2 py-4 h-full w-full">
    //   {loading ? (
    //     <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    //   ) : (
    //     <>
    //         {
    //             songs.map((song) => {
    //                 return (
    //                     <div key={song.id} className="flex flex-col items-center justify-center">
    //                         <div className="flex overflow-x-auto gap-x-5 whitespace-nowrap">
    //                           <div className="flex items-center px-5 py-3 font-medium text-blue-500 rounded-lg cursor-pointer bg-blue-50 gap-x-2">
    //                           {song.title}
    //                           </div>
    //                           <div className="flex items-center px-5 py-3 font-medium text-gray-900 bg-gray-100 rounded-lg cursor-pointer gap-x-2 hover:bg-blue-50 hover:text-blue-500">
    //                           {song.author}
    //                           </div>
    //                           <button
    //                             className="px-4 py-2 bg-blue-400 active:bg-red-500 rounded-lg text-white hover:bg-blue-600"
    //                             onClick={() => setQuoteId(song.id)}>Delete</button>
    //                         </div>
    //                     </div>
    //                 )
    //             })
    //         }
    //     </>
    //   )}

    //   <form
    //     onSubmit={handleSubmit}
    //     autoComplete="off"
    //     className="w-full max-w-[600px] p-10 bg-white rounded-lg shadow mx-auto mt-10"
    //     aria-label="signup-form"
    //   >
    //     <h2 className="mb-10 text-3xl font-bold text-center">Tạo thông tin</h2>
    //     <div className="flex flex-col items-start mb-5 gap-y-3">
    //       <label htmlFor="email" className="text-sm font-medium cursor-pointer">
    //         Tên bài hát
    //       </label>
    //       <input
    //         id="email"
    //         type="text"
    //         className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
    //         placeholder="Nhập tên bài hát..."
    //         value={quote}
    //         onChange={(e) => setQuote(e.target.value)}
    //       />
    //     </div>
    //     <div className="flex flex-col items-start mb-5 gap-y-3">
    //       <label
    //         htmlFor="password"
    //         className="text-sm font-medium cursor-pointer"
    //       >
    //         Người thể hiện
    //       </label>
    //       <input
    //         id="password"
    //         type="text"
    //         className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
    //         placeholder="Nhập tên ca sĩ..."
    //         value={author}
    //         onChange={(e) => setAuthor(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
    //     >
    //       Tạo thông tin
    //     </button>
    //   </form>

    //     <div className="mx-auto">

    //     <form
    //       className="flex flex-col border border-slate-200 rounded-xl w-[400px] bg-pink-100 mt-4"
    //       aria-label="simple-form"
    //       onSubmit={handleDelete}
    //     >
    //       <div className="flex-1">
    //         <input
    //           type="text"
    //           placeholder="Enter your postId"
    //           className="w-full p-3 bg-transparent outline-none"
    //           value={quoteId}
    //           onChange={(e) => setQuoteId(e.target.value)}
    //         />
    //       </div>
    //     </form>
    //       <button
    //       onClick={handleDelete}
    //       className="flex p-3 font-bold text-white bg-red-500 rounded-xl mx-auto mt-4 active:bg-blue-500 ">
    //         Delete
    //       </button>
    //     </div>

    // </div>
    <div>
      {songs.map((song) => {
        return (
          <div
            key={song.id}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex overflow-x-auto gap-x-5 whitespace-nowrap">
              <div className="flex items-center px-5 py-3 font-medium text-blue-500 rounded-lg cursor-pointer bg-blue-50 gap-x-2">
                {song.singer}
              </div>
              <div className="flex items-center px-5 py-3 font-medium text-gray-900 bg-gray-100 rounded-lg cursor-pointer gap-x-2 hover:bg-blue-50 hover:text-blue-500">
                {song.song}
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <form
          autoComplete="off"
          className="w-full max-w-[600px] p-10 bg-white rounded-lg shadow mx-auto mt-10"
          aria-label="signup-form"
        >
          <h2 className="mb-10 text-3xl font-bold text-center">
            Tạo thông tin
          </h2>
          <div className="flex flex-col items-start mb-5 gap-y-3">
            <label
              htmlFor="email"
              className="text-sm font-medium cursor-pointer"
            >
              Tên bài hát
            </label>
            <input
              id="song"
              type="text"
              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
              placeholder="Nhập tên bài hát..."
              value={songOfSinger}
              onChange={e => setSongOfSinger(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start mb-5 gap-y-3">
            <label
              htmlFor="password"
              className="text-sm font-medium cursor-pointer"
            >
              Người thể hiện
            </label>
            <input
              id="singer"
              type="text"
              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
              placeholder="Nhập tên ca sĩ..."
              value={singer}
              onChange={e => setSinger(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleCreate}
            className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
          >
            Tạo thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirebaseApp;
