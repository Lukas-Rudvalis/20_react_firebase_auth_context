import { useFormik } from 'formik';
import React from 'react';
import { useAuthCtx } from '../../store/AuthProvider';

function NewComment({ onNewComment }) {
  const { user } = useAuthCtx();
  const formik = useFormik({
    initialValues: {
      authorEmail: '',
      body: 'body of comment 1',
      title: 'Comment 1',
    },
    onSubmit: (values) => {
      console.log(values);
      onNewComment(values);
    },
  });

  formik.values.authorEmail = user?.email || '';

  return (
    <div>
      <h3>Comment here</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="authorEmail">Author</label>
        <input
          id="authorEmail"
          name="authorEmail"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.authorEmail}
          disabled
        />

        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          type="textarea"
          onChange={formik.handleChange}
          value={formik.values.body}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewComment;
