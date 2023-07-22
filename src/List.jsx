function ListItem ({ image })
{


  return (
    <a href={ `/image/${image.id}` }>
      <div>
        <h1>{ image.common_name }</h1>
        <p>id: { image.id }</p>
      </div>
    </a>
  )

}

function List ({ images })
{

  return (
    <>
      { images.length === 0 ? <div className="h-screen flex justify-center items-center">Loading... </div> : (
        <div>
          <h2>OVER 10,000+ SPECIES OF PLANTS AVAILABLE</h2>
          <div>

            {
              images.map((image) => (
                <ListItem image={ image }></ListItem>
              ))
            }
          </div>
          <div>{ images.length } files</div>
        </div >) }
    </>

  )
}

export default List