import axios from "axios";


const fetchImagesFromGCP = async (tag, category, setIsLoading = (value) => { }) => {
    try {
        console.log("fetchImagesFromGCP", tag, category)
        if (tag.trim() != '' && category != '') {
            setIsLoading(true);
            const response = await axios.get(`https://winding-backend.vercel.app/api/getImages/${tag}/${category}`);

            const { files } = response.data;

            const formattedImages = files.map((file, index) => ({
                id: index + 1,
                alt: "",
                name: "",
                focus: "",
                title: "",
                source: "",
                filename: file,
                copyright: "",
                fieldtype: "asset",
                meta_data: {},
                is_private: false,
            }));

            switch (category) {
                case 'exterior':
                    return formattedImages[0];
                    // setExteriorImages(formattedImages);

                    break;
                // case 'interior':
                //     setInteriorImages(formattedImages);
                //     break;
                // case 'mechanical':
                //     setMechanicalImages(formattedImages);
                //     break;
                // case 'document':
                //     setDocumentImages(formattedImages);
                //     break;
                default:
                    break;
            }
        }
        else {
            return null;
        }

    } catch (error) {
        console.error('Error fetching images from GCP:', error);
    } finally {
        setIsLoading(false);
    }
};
export default fetchImagesFromGCP;
