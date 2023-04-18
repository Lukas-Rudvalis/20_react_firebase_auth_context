import React, { useEffect, useState } from 'react';
import NewComment from './NewComment';
import ListComments from './ListComments';
import './CommentBlock.scss';
import { addDoc, collection, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

function CommentsBlock({ postId }) {
  const [commentsCollRef, setcommentsCollRef] = useState({});
  const [commentsArr, setCommentsArr] = useState([]);
  const [commentTrigger, setCommentTrigger] = useState(false);

  useEffect(() => {
    async function getCommentsAboutPost() {
      const docRef = doc(db, 'posts', postId);
      const commentsCollRef = collection(docRef, 'comments'); // query
      setcommentsCollRef(commentsCollRef);
      const q = query(commentsCollRef);
      const querySnapshot = await getDocs(q);
      const tempComments = [];
      querySnapshot.forEach((doc) => {
        tempComments.push({ uid: doc.id, ...doc.data() });
        // console.log(doc.id, ' => ', doc.data());
      });
      setCommentsArr(tempComments);
    }
    getCommentsAboutPost();
  }, [commentTrigger]);

  async function createCommentFire(newCommentObj) {
    try {
      const result = await addDoc(commentsCollRef, newCommentObj);
      console.log('Document written with ID: ', result.id);
      setCommentTrigger(!commentTrigger);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <div className="commentBlock">
      <NewComment onNewComment={createCommentFire} />
      <ListComments list={commentsArr} />
    </div>
  );
}

export default CommentsBlock;
