import styled from "@emotion/styled"

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;

  button {
    width: 80%;
    max-width: 200px;
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    background: #407bff;
    color: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    font-family: Montserrat;

    &:hover {
      background-color: #0056b3;
    }
  }

  @media (min-width: 768px) {
    button {
      width: 250px;
      font-size: 20px;
    }
  }
`

export const Line = styled.div`
  padding: 30px;
  border-bottom: 1px solid gray;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`

export const Flexing = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  button {
    width: 50%;
    font-size: 10px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;

    button {
      width: 50%;
      font-size: 16px;
    }
  }
`

export const Span = styled.span`
  color: red;
  font-weight: 600;
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  img {
    max-width: 100px;
  }

  @media (min-width: 768px) {
    img {
      max-width: 150px;
    }
  }
`

export const DeleteBtn = styled.div`
  width: 200px;
  padding: 10px 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  background: red;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  font-family: Montserrat;
  text-align: center;

  &:hover {
    background-color: #cc0001;
  }
`
export const CancelBtn = styled.div`
  width: 200px;
  padding: 10px 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  background: blue;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  font-family: Montserrat;
  text-align: center;
`
