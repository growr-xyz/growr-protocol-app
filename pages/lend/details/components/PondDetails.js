import styles from "./PondDetails.module.css";

function PondDetails({ name, token, apr, disb, cashback, maxAmount, minAmount, maxDuration, minDuration, eligibilityCriteria, total, utilized, interest }) {
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <h4>Parameters:</h4>
            </div>
            <div className={styles.container}>
                Name: {name}
            </div>
            <div className={styles.container}>
                Token: {token}
            </div>
            <div className={styles.container}>
                APR rate: {apr} %
            </div>
            <div className={styles.container}>
                Disbursement rate: {disb} %
            </div>
            <div className={styles.container}>
                Cash-back rate: {cashback} %
            </div>
            <div className={styles.container}>
                Min loan amount: {minAmount} {token}
            </div>
            <div className={styles.container}>
                Max loan amount: {maxAmount} {token}
            </div>
            <div className={styles.container}>
                Min loan duration: {minDuration} months
            </div>
            <div className={styles.container}>
                Max loan duration: {maxDuration} months
            </div>
            <div className={styles.container}>
                Eligibility criteria: {eligibilityCriteria}
            </div>
            <div className={styles.container}>
                <h4>Utilization:</h4>
            </div>
            <div className={styles.container}>
                Total: {total} {token}
            </div>
            <div className={styles.container}>
                Utilized: {utilized} {token}
            </div>
            <div className={styles.container}>
                Interest: {interest} {token}
            </div>
        </div >
    );
}

export default PondDetails;