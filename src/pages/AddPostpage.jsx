import NewPostForm from '../components/posts/NewPostForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function AddPostsPage() {
  const navigate = useNavigate();
  async function createPostFire(newPostObj) {
    try {
      const docRef = await addDoc(collection(db, 'posts'), newPostObj);
      console.log('Document written with ID: ', docRef.id);
      navigate('/posts');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <div className="container">
      <h1>AddPosts Page</h1>
      <p>This is AddPosts Page</p>
      <NewPostForm onNewPost={createPostFire} />
    </div>
  );
}

export default AddPostsPage;
