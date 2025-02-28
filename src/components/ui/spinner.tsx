import { Comment } from 'react-loader-spinner'

export const Spinner = () => {
  return(
    <div className="grid place-items-center">
      <Comment
        visible={true}
        height="40"
        width="40"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#0162ac"
        />
    </div>
  )
}

export default Spinner
