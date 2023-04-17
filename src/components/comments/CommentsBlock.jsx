import React, { useEffect, useState } from 'react';
import NewComment from './NewComment';
import ListComments from './ListComments';
import './CommentBlock.scss';
import { addDoc, collection, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

function CommentsBlock({ postId }) {
  const [commentsArr, setCommentsArr] = useState([]);

  async function getCommentsAboutPost() {
    const docRef = doc(db, 'posts', postId);
    const commentsCollRef = collection(docRef, 'comments');
    const q = query(commentsCollRef);
    const querySnapshot = await getDocs(q);
    const tempComments = [];
    querySnapshot.forEach((doc) => {
      tempComments.push({ uid: doc.id, ...doc.data() });
      // console.log(doc.id, ' => ', doc.data());
    });
    setCommentsArr(tempComments);
  }
  useEffect(() => {
    getCommentsAboutPost();
  }, []);

  async function createCommentFire(newCommentObj) {
    try {
      const docRef = doc(db, 'posts', postId);
      const commentsCollRef = await addDoc(
        collection(docRef, 'comments'),
        newCommentObj,
      );
      console.log('Document written with ID: ', commentsCollRef.id);
      getCommentsAboutPost();
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
