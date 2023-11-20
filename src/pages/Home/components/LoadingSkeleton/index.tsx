import { Container, Skeleton } from '@mui/material'
import { Item, Menu } from './styles'

const LoadingSkelelton = () => {
  return (
    <Container>
      <Menu>
        <div className="title">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={'100%'}
            height={'100%'}
          />
        </div>
        <div className="list">
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
        </div>
      </Menu>
      <Menu>
        <div className="title">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={'100%'}
            height={'100%'}
          />
        </div>
        <div className="list">
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
          <Item>
            <div className="image">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className="bottom">
              <div className="date">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <Skeleton
                variant="circular"
                animation="wave"
                height={'30px'}
                width={'30px'}
              />
            </div>
          </Item>
        </div>
      </Menu>
    </Container>
  )
}
export default LoadingSkelelton
