import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardHeader, CardBody, Col, Button } from 'react-bootstrap';
import TextFormInput from '@/components/form/TextFormInput';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import CheckboxGroup from '@/components/form/CheckboxGroup';
import RadioGroup from '@/components/form/RadioGroup';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';

const InvestorPreferences = () => {
  const preferencesSchema = yup.object({
    startupTypes: yup.string().required('Please select a startup type'),
    investmentStage: yup.array().of(yup.string()).required('Please select at least one stage'),
    preferredIndustry: yup.string().optional(),
    regionPreference: yup.string().optional(),
    investmentSize: yup.string().required('Please select an investment size'),
    totalBudget: yup.string().optional(),
    coInvesting: yup.string().required('Please select an option'),
    equityPercentage: yup.string().optional(),
    involvementLevel: yup.string().required('Please select involvement level'),
    experienceYears: yup.string().required('Please select years of experience'),
    successStories: yup.string().optional(),
    keyCriteria: yup.array().of(yup.string()).required('Please select at least one criteria'),
    riskTolerance: yup.string().required('Please select a risk tolerance level'),
    primaryGoals: yup.array().of(yup.string()).required('Please select at least one goal'),
    investmentType: yup.string().required('Please select an investment type'),
    returnExpectations: yup.string().optional(),
    waitTime: yup.string().required('Please select wait time for returns'),
    additionalSupport: yup.string().required('Please select an option for providing additional support'),
    previousInvestmentExperience: yup.string().required('Please select if you have previous investment experience'),
    numberOfInvestments: yup.string().optional(),
    decisionProcess: yup.string().optional(),
    exitStrategy: yup.string().required('Please select if you prefer an exit strategy'),
    fundraisingStage: yup.string().optional(),
    geographicPreferences: yup.string().optional(),
    involvementAfterInvestment: yup.string().required('Please select expected involvement after investment'),
    updatesSubscription: yup.string().required('Please select if you want updates'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(preferencesSchema),
    defaultValues: {
      startupTypes: '',
      investmentStage: [],
      preferredIndustry: '',
      regionPreference: '',
      investmentSize: '',
      totalBudget: '',
      coInvesting: '',
      equityPercentage: '',
      involvementLevel: '',
      experienceYears: '',
      successStories: '',
      keyCriteria: [],
      riskTolerance: '',
      primaryGoals: [],
      investmentType: '',
      returnExpectations: '',
      waitTime: '',
      additionalSupport: '',
      previousInvestmentExperience: '',
      numberOfInvestments: '',
      decisionProcess: '',
      exitStrategy: '',
      fundraisingStage: '',
      geographicPreferences: '',
      involvementAfterInvestment: '',
      updatesSubscription: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Investor Preferences:', data);
  };

  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        <h1 className="h5 card-title">Investor Preferences</h1>
        <p className="mb-0">Please provide your investment preferences and criteria.</p>
      </CardHeader>
      <CardBody>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Investment Preferences */}
          <Col md={6}>
            <label className="form-label">Startup Types</label>
            <ChoicesFormInput name="startupTypes" control={control}>
              <option value="">Select startup type</option>
              <option value="Tech">Tech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
              <option value="SaaS">SaaS</option>
              <option value="Fintech">Fintech</option>
              <option value="Consumer Goods">Consumer Goods</option>
              <option value="Sustainability">Sustainability</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Biotech">Biotech</option>
              <option value="Other">Other</option>
            </ChoicesFormInput>
          </Col>
          <CheckboxGroup
            name="investmentStage"
            label="Preferred Investment Stage"
            options={['Seed Stage', 'Early Stage', 'Growth Stage', 'Mature Stage']}
            control={control}
            containerClassName="col-md-6"
          />
          <TextFormInput name="preferredIndustry" label="Preferred Industry or Sector" control={control} containerClassName="col-md-6" />
          <TextFormInput name="regionPreference" label="Region Preference" control={control} containerClassName="col-md-6" />
          <Col md={6}>
            <label className="form-label">Investment Size</label>
            <ChoicesFormInput name="investmentSize" control={control}>
              <option value="">Select investment size</option>
              <option value="Under $50k">Under $50k</option>
              <option value="$50k - $200k">$50k - $200k</option>
              <option value="$200k - $500k">$200k - $500k</option>
              <option value="$500k - $1M">$500k - $1M</option>
              <option value="Over $1M">Over $1M</option>
            </ChoicesFormInput>
          </Col>
          <TextFormInput name="totalBudget" label="Total Budget (Optional)" control={control} containerClassName="col-md-6" />
          <RadioGroup
            name="coInvesting"
            label="Open to Co-Investing"
            options={['Yes', 'No', 'Maybe']}
            control={control}
            containerClassName="col-md-6"
          />
          <TextFormInput name="equityPercentage" label="Equity Percentage (Optional)" control={control} containerClassName="col-md-6" />
          <Col md={6}>
            <label className="form-label">Involvement Level</label>
            <ChoicesFormInput name="involvementLevel" control={control}>
              <option value="">Select involvement level</option>
              <option value="Active (Advisory/Board)">Active (Advisory/Board)</option>
              <option value="Passive">Passive</option>
              <option value="Both">Both</option>
            </ChoicesFormInput>
          </Col>
          <Col md={6}>
            <label className="form-label">Investment Experience</label>
            <ChoicesFormInput name="experienceYears" control={control}>
              <option value="">Select experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="6-10 years">6-10 years</option>
              <option value="10+ years">10+ years</option>
            </ChoicesFormInput>
          </Col>
          <TextAreaFormInput
            name="successStories"
            label="Success Stories (Optional)"
            rows={3}
            control={control}
            containerClassName="col-12"
          />
          <CheckboxGroup
            name="keyCriteria"
            label="Key Evaluation Criteria"
            options={['Strong Leadership Team', 'Scalable Business Model', 'Market Demand', 'Innovation', 'Traction', 'Exit Potential', 'Other']}
            control={control}
            containerClassName="col-12"
          />
          <Col md={6}>
            <label className="form-label">Risk Tolerance</label>
            <ChoicesFormInput name="riskTolerance" control={control}>
              <option value="">Select risk tolerance</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </ChoicesFormInput>
          </Col>
          <CheckboxGroup
            name="primaryGoals"
            label="Primary Goals"
            options={['Financial Return', 'Portfolio Diversification', 'Impact Investing', 'Supporting Innovation', 'Mentoring', 'Other']}
            control={control}
            containerClassName="col-md-6"
          />
          <TextFormInput name="investmentType" label="Investment Type" control={control} containerClassName="col-md-6" />
          <TextFormInput name="returnExpectations" label="Return Expectations" control={control} containerClassName="col-md-6" />
          <ChoicesFormInput name="waitTime" control={control}>
            <option value="">Select wait time for returns</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </ChoicesFormInput>
          <RadioGroup
            name="additionalSupport"
            label="Interested in providing additional support (e.g., mentorship)?"
            options={['Yes', 'No']}
            control={control}
            containerClassName="col-md-6"
          />
          <RadioGroup
            name="previousInvestmentExperience"
            label="Do you have previous investment experience?"
            options={['Yes', 'No']}
            control={control}
            containerClassName="col-md-6"
          />
          <TextFormInput name="numberOfInvestments" label="Number of Investments (Optional)" control={control} containerClassName="col-md-6" />
          <TextFormInput name="decisionProcess" label="Decision Process (Optional)" control={control} containerClassName="col-md-6" />
          <RadioGroup
            name="exitStrategy"
            label="Preferred Exit Strategy"
            options={['IPO', 'Acquisition', 'Secondary Sale', 'Other']}
            control={control}
            containerClassName="col-md-6"
          />
          <TextFormInput name="fundraisingStage" label="Fundraising Stage (Optional)" control={control} containerClassName="col-md-6" />
          <TextFormInput name="geographicPreferences" label="Geographic Preferences (Optional)" control={control} containerClassName="col-md-6" />
          <ChoicesFormInput name="involvementAfterInvestment" control={control}>
            <option value="">Involvement after investment</option>
            <option value="Advisory">Advisory</option>
            <option value="Board Member">Board Member</option>
            <option value="Passive">Passive</option>
          </ChoicesFormInput>
          <RadioGroup
            name="updatesSubscription"
            label="Would you like to receive updates?"
            options={['Yes', 'No']}
            control={control}
            containerClassName="col-md-6"
          />
          <Col xs={12} className="text-end">
            <Button variant="primary" type="submit" className="mb-0">
              Submit Preferences
            </Button>
          </Col>
        </form>
      </CardBody>
    </Card>
  );
};

export default InvestorPreferences;
