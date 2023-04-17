// NewPost.jsx

import React from 'react';
import { useFormik } from 'formik';
import './new-post.scss';
import { useAuthCtx } from '../../store/AuthProvider';

const NewPostForm = ({ onNewPost }) => {
  const { user } = useAuthCtx();
  const formik = useFormik({
    initialValues: {
      title: 'Post 1',
      body: 'The body of Post',
      author: user?.email || '',
      tags: 'one, two, three',
      date: '',
      userUid: user?.uid || '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = 'Title is required';
      }

      if (!values.body) {
        errors.body = 'Body is required';
      }

      if (!values.author) {
        errors.author = 'Author is required';
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      onNewPost(values);
    },
  });

  formik.values.author = user?.email || '';
  formik.values.userUid = user?.uid || '';

  return (
    <div className="new-post-form">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="error-message">{formik.errors.title}</div>
        ) : null}

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
        />
        {formik.touched.body && formik.errors.body ? (
          <div className="error-message">{formik.errors.body}</div>
        ) : null}

        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
        />
        {formik.touched.author && formik.errors.author ? (
          <div className="error-message">{formik.errors.author}</div>
        ) : null}

        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tags}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPostForm;
