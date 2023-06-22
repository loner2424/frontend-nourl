import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  if(inputValue.indexOf("h")!==0 && inputValue.indexOf("H")!==0 ){
    inputValue = "http://" + inputValue
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(inputValue)
      if(inputValue !=="http://"){
      const res = await axios.post( "https://nourl.onrender.com/url" ,{"url":inputValue} );
      setShortenLink(res.data.id);}
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if(loading) {
    return <p className="noData">Loading...</p>
  }
  if(error) {
    return <p className="noData">Something went wrong :(</p>
  }
    

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard
            text={ "https://nourl.onrender.com/" + shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={copied ? "copied" : ""}>COPY TO CLIPBOARD</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  )
}

export default LinkResult