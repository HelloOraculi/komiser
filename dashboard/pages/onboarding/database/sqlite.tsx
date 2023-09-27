import Head from 'next/head';
import { ChangeEvent, useRef, useState, FormEvent } from 'react';

import { allDBProviders } from '../../../utils/providerHelper';

import OnboardingWizardLayout, {
  LeftSideLayout,
  RightSideLayout
} from '../../../components/onboarding-wizard/OnboardingWizardLayout';
import Folder2Icon from '../../../components/icons/Folder2Icon';
import DatabasePurplin from '../../../components/onboarding-wizard/DatabasePurplin';
import InputFileSelect from '../../../components/onboarding-wizard/InputFileSelect';
import CredentialsButton from '../../../components/onboarding-wizard/CredentialsButton';
import settingsService from '../../../services/settingsService';
import useToast from '../../../components/toast/hooks/useToast';
import Toast from '../../../components/toast/Toast';
import DatabaseErrorMessage from '../../../components/onboarding-wizard/DatabaseErrorMessage';

export default function SqliteCredentials() {
  const database = allDBProviders.SQLITE;

  const { toast, setToast, dismissToast } = useToast();

  const [filePath, setFilePath] = useState<string>('');
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();

    if (!filePath || isError || isValidationError) return;

    const payload = JSON.stringify({
      type: 'SQLITE',
      filePath
    });

    settingsService.saveDatabaseConfig(payload).then(res => {
      setIsError(false);

      if (res === Error) {
        setIsError(true);
      } else {
        setToast({
          hasError: false,
          title: 'Database connected',
          message:
            'Your Postgres database has been successfully connected to Komiser.'
        });
      }
    });
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidationError(false);
    setIsError(false);
    setErrorMessage('');
    setFilePath('');

    const fileName = e.target.files?.[0].name;

    if (fileName) {
      setFilePath(fileName);
      if (!fileName.endsWith('.db')) {
        setIsValidationError(true);
        setErrorMessage(
          'Wrong file or file type not supported. Please choose a different file.'
        );
      }
    } else {
      setIsValidationError(true);
      setErrorMessage('Please choose a file.');
    }
  };

  return (
    <div>
      <Head>
        <title>Configure SQLite - Komiser</title>
        <meta name="description" content="Setup SQLite - Komiser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OnboardingWizardLayout>
        <LeftSideLayout
          title="Configure your SQLite database"
          progressBarWidth="81%"
        >
          <div className="leading-6 text-gray-900/60">
            <div className="font-normal">
              SQLite is a lightweight, serverless, self-contained RDBMS that
              operates directly on files. It is known for its simplicity, ease
              of use, and portability across platforms.
            </div>
          </div>

          {isError && <DatabaseErrorMessage />}

          <form onSubmit={handleNext}>
            <div className="flex flex-col space-y-4 py-10">
              <div className="space-y-[0.2]">
                <InputFileSelect
                  type="text"
                  id="file-path-input"
                  label="File path"
                  subLabel="Enter the path or browse the file"
                  placeholder="C:\Documents\Komiser\database"
                  icon={<Folder2Icon className="h-6 w-6" />}
                  fileInputRef={fileInputRef}
                  iconClick={handleButtonClick}
                  value={filePath}
                  hasError={isValidationError}
                  errorMessage={errorMessage}
                  handleFileChange={handleFileChange}
                />
              </div>
            </div>

            <CredentialsButton
              handleNext={handleNext}
              nextLabel="Add database"
            />
          </form>
        </LeftSideLayout>

        <RightSideLayout>
          <DatabasePurplin database={database} />
        </RightSideLayout>

        {/* Toast component */}
        {toast && <Toast {...toast} dismissToast={dismissToast} />}
      </OnboardingWizardLayout>
    </div>
  );
}
