import { getThumbFilename} from "../file";

it("expect to equal correct filename", async () => {
    const data = getThumbFilename('fjord.jpg', 200, 200);
    expect(data).toEqual(
        'fjord-200-200.jpg'
    );
});



