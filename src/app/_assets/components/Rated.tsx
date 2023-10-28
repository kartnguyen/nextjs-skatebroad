import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { user } from "../libs/index";
import { Typography } from "antd";
import { StarFilled } from "@ant-design/icons";

const Rated = () => {
  return (
    <MDBCarousel showControls showIndicators dark>
      {user.map((item) => (
        <MDBCarouselItem key={item.id}>
          <div className="container">
            <div className="user-rated">
              {item.rated === 5 ? (
                <div>
                  <StarFilled style={{ color: "orange", fontSize: 24 }} />
                  <StarFilled
                    style={{ color: "orange", fontSize: 24, margin: 4 }}
                  />
                  <StarFilled style={{ color: "orange", fontSize: 24 }} />
                  <StarFilled
                    style={{ color: "orange", fontSize: 24, margin: 4 }}
                  />
                  <StarFilled style={{ color: "orange", fontSize: 24 }} />
                </div>
              ) : (
                <div>
                  <StarFilled style={{ color: "orange", fontSize: 24 }} />
                  <StarFilled
                    style={{ color: "orange", fontSize: 24, margin: 4 }}
                  />
                  <StarFilled style={{ color: "orange", fontSize: 24 }} />
                  <StarFilled
                    style={{ color: "orange", fontSize: 24, marginLeft: 4 }}
                  />
                </div>
              )}
              <Typography.Title level={4} className="content">
                {item.content}
              </Typography.Title>
              <div className="name">
                <Typography.Title level={5}>{item.name}</Typography.Title>
                <p>{item.job}</p>
              </div>
              <img
                src={item.avatar}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  margin: 32,
                }}
              />
            </div>
          </div>
        </MDBCarouselItem>
      ))}
    </MDBCarousel>
  );
};

export default Rated;
