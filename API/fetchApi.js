export default async function fetchApi(url, options)
{
  try {
    let res = await fetch('http://localeo.herokuapp.com/API/' + url, options);

    let json = await res.text();
    if (json.charAt(0) !== '<') json = JSON.parse(json);
    else
    {
      return { error: json };
    }
    return json;
  } catch (e) {
    console.log(e);
  }
}
