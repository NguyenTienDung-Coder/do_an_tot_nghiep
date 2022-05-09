import {
  CateA,
  CateSpan,
  ContainerCate,
  ContainerCateInner,
} from "./category.styled";

function Category(props) {
  const txt = props;
  return (
    <ContainerCate>
      <ContainerCateInner>
        <CateA href='/'>Trang chủ</CateA>
        <CateSpan> /</CateSpan>
        <CateSpan>{txt.name}</CateSpan>
      </ContainerCateInner>
    </ContainerCate>
  );
}
export default Category;
