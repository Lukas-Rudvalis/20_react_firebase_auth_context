import React from 'react';
import NewComment from './NewComment';
import ListComments from './ListComments';

function CommentsBlock() {
  return (
    <div>
      <NewComment />
      <ListComments />
    </div>
  );
}

export default CommentsBlock;
