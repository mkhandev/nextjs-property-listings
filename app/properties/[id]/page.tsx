const PropertyPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  return <div>PropertyPage {id}</div>;
};

export default PropertyPage;
