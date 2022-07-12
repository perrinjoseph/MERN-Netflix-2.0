import { render, screen, fireEvent } from "../../../Utils/test";
import { axe } from "jest-axe";
import Card from "..";
import { act } from "react-dom/test-utils";

describe("Movie Card Component", () => {
  const mockProps = {
    movie: {
      thumbnailImage: {
        fieldname: "thumbnailImage",
        originalname: "Me Before you thumbnail.png",
        encoding: "7bit",
        mimetype: "image/png",
        id: "62aa89a776f561882737e86d",
        filename: "993a748de010ee3bffe55a4e1525c865",
        metadata: null,
        bucketName: "mediaBucket",
        chunkSize: 261120,
        size: 2830447,
        uploadDate: "2022-06-16T01:38:48.268Z",
        contentType: "image/png",
      },
      bannerImage: {
        fieldname: "bannerImage",
        originalname: "Me before you banner.png",
        encoding: "7bit",
        mimetype: "image/png",
        id: "62aa89a776f561882737e879",
        filename: "aecdff56d4afd17bc2d43fbd66a1b78f",
        metadata: null,
        bucketName: "mediaBucket",
        chunkSize: 261120,
        size: 177258,
        uploadDate: "2022-06-16T01:38:49.280Z",
        contentType: "image/png",
      },
      titleImage: {
        fieldname: "titleImage",
        originalname: "Me before you title.png",
        encoding: "7bit",
        mimetype: "image/png",
        id: "62aa89a776f561882737e87a",
        filename: "edfc1576b5655756c3821607db584cd6",
        metadata: null,
        bucketName: "mediaBucket",
        chunkSize: 261120,
        size: 55611,
        uploadDate: "2022-06-16T01:38:47.952Z",
        contentType: "image/png",
      },
      _id: "62aa89a976f561882737e895",
      title: "Me Before You",
      description:
        "A girl in a small town forms an unlikely bond with a recently-paralyzed man she's taking care of. Lou Clark knows lots of things. She knows how many footsteps there are between the bus stop and home. She knows she likes working in The Buttered Bun tea shop and she knows she might not love her boyfriend Patrick.",
      trailer: "videos\\1ba0e476f4c8face56af2f2bee11ee3b.mp4",
      limit: 0.22,
      genre: "Romance",
      isSeries: false,
      createdAt: "2022-06-16T01:38:49.336Z",
      updatedAt: "2022-06-21T03:34:07.611Z",
      __v: 0,
    },
    img: "Mock/Image/Link",
    title: "Test Movie Title",
    watched: 90,
    duration: 100,
    trailer: "Mock/Trailer/Access/Link",
    getOnHover: () => {},
    growDirection: "center",
  };

  test("Should have no accessibility violations", async () => {
    const { container } = render(<Card />);
    const { violations } = await axe(container);
    expect(violations).toStrictEqual([]);
  });

  describe("Card Scale Feature On Hovering", () => {
    test("Should scale the card when you hover after 800ms", async () => {
      //-------Scale feature (@media max-width 1000)-------
      jest.useFakeTimers();
      const { unmount } = render(<Card {...mockProps} screenWidth={1000} />);
      const cardComponentDesktopView = screen.getByRole("img", {
        name: "movie",
      });
      fireEvent.mouseEnter(cardComponentDesktopView);

      //A video element is rendered only after 800ms of hovering
      //so we will first check to see if the element exists before 800ms
      expect(screen.queryByLabelText("video-player")).toBeNull();

      //Lets advance our timer to see when the videoplayer shows up
      act(() => jest.advanceTimersByTime(200));
      expect(screen.queryByLabelText("video-player")).not.toBeInTheDocument();
      act(() => jest.advanceTimersByTime(800));
      expect(screen.getByLabelText("video-player")).toBeInTheDocument();
      unmount();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      //-------Scale feature (@media max-width 600)-------
      jest.useFakeTimers();
      render(<Card {...mockProps} screenWidth={600} />);
      const cardComponentMobileView = screen.getByRole("img", {
        name: "movie",
      });
      fireEvent.mouseEnter(cardComponentMobileView);

      // A video element is not rendered in mobile view
      act(() => jest.advanceTimersByTime(800));
      expect(screen.queryByLabelText("video-player")).not.toBeInTheDocument();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test("Should scale down when mouse exists before timer or after", () => {
      //-------Mouse exit after scaling-------
      jest.useFakeTimers();
      const { unmount } = render(<Card {...mockProps} screenWidth={1000} />);
      const cardComponentDesktopView = screen.getByRole("img", {
        name: "movie",
      });
      fireEvent.mouseEnter(cardComponentDesktopView);
      act(() => jest.advanceTimersByTime(800));
      expect(screen.getByLabelText("video-player")).toBeInTheDocument();
      fireEvent.mouseLeave(cardComponentDesktopView);
      expect(screen.queryByLabelText("video-player")).not.toBeInTheDocument();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      unmount();

      //-------Mouse exit before scaling-------
      jest.useFakeTimers();
      render(<Card {...mockProps} screenWidth={1000} />);
      fireEvent.mouseEnter(cardComponentDesktopView);
      act(() => jest.advanceTimersByTime(100));
      fireEvent.mouseLeave(cardComponentDesktopView);
      expect(screen.queryByLabelText("video-player")).not.toBeInTheDocument();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });
});
