import React, { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore';
import Layout from '../components/layout/Layout';
import LegalContents from '../components/features/LegalContents';

const HowToBuy = () => {
    const { LegalDetailsRequest } = FeatureStore();
    useEffect(() => {
      (async () => {
        await LegalDetailsRequest("howtobuy");
      })();
    }, []);

    return (
      <Layout>
        <LegalContents />
      </Layout>
    );
};

export default HowToBuy;