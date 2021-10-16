import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
const News = () => {
    let [topNews, setTopNews] = useState([]);
    let countries = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id',
        'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si',
        'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
    let categories = ['business', 'entertainment', 'general', 'health',
        'science', 'sports', 'technology'];
    let [selectedCountry, setSelectedCountry] = useState('in');
    let [selectedCategory, setSelectedCategory] = useState('sports');

    useEffect(() => {
        console.log("AXIOS")
        // Simple GET request using axios
        getTopNews()
    }, [selectedCategory, selectedCountry]);
    const getTopNews = () => {
        let url = 'https://newsapi.org/v2/top-headlines?country=' + selectedCountry + '&category=' + selectedCategory + '&apiKey=262ca29f445840a596e6301fc64290dd'
        axios.get(url)
            .then(response => {
                // console.log("Response :: ", response)
                if (response && response.data && response.data.status === 'ok') {
                    if (response.data.articles) {
                        console.log('response.data.articles :: ', response.data.articles);
                        setTopNews(response.data.articles)
                    }
                }
            });
    }

    const onCategoryChange = (event) => {
        console.log(event);
        setSelectedCategory(event.target.value)
    }
    const onCountryChange = (event) => {
        console.log(event);
        setSelectedCountry(event.target.value)
    }
    return (
        <>
            <Container style={{marginBottom:'10px', marginTop:'10px'}}>
                <Row className="justify-content-md-center">
                    <Col lg={1} md={1}>
                        <lable style={{background:'#E9ECEF',padding:'6px 10px'}}>Filter</lable>
                    </Col>
                    <Col>
                        <div className="input-group mb-6">
                            <div className="input-group-prepend">
                                <label className="input-group-text" for="inputGroupSelect01">Country</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01" onChange={onCountryChange}>
                                {countries.map(item => {
                                    return (<option selected={selectedCountry === item} value={item}>{item.toUpperCase()}</option>)
                                })}
                            </select>
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-6">
                            <div className="input-group-prepend">
                                <label className="input-group-text" for="inputGroupSelect01">Category</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01" onChange={onCategoryChange}>
                                {categories.map(item => {
                                    return (<option selected={selectedCategory === item} value={item}>{item.toUpperCase()}</option>)
                                })}
                            </select>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>{
                topNews.map(item => {
                    return (<Row className="justify-content-md-center">
                        <div className="card">
                            <img className="card-img-top" src={item.urlToImage} alt="Card image cap"></img>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>

                            </div>
                        </div>
                    </Row>)
                })}
            </Container>
        </>
    )
}

export default News;