import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Card from '../components/ui/card/Card';
import CommentsBlock from '../components/comments/CommentsBlock';

function SinglePostPage() {
  const { postUid } = useParams();
  const navigate = useNavigate();
  const [postObj, setPostObj] = useState({});

  useEffect(() => {
    async function getSingleDoc() {
      const docRef = doc(db, 'posts', postUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setPostObj(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    }
    getSingleDoc();
  }, []);

  return (
    <div className="container">
      <Card>
        <h1>{postObj.title}</h1>
        <p>This is SinglePostPage</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </Card>
      <CommentsBlock postId={postUid} />
    </div>
  );
}

export default SinglePostPage;
