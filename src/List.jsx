function List ({ images })
{

  return (
    <>
      {
        images.map((image) => (
          <div key={ image.id }>{ image.common_name }</div>
        ))
      }
    </>

  )
}

export default List